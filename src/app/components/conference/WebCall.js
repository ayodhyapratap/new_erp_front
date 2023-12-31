import React from "react";
import io from 'socket.io-client';
import {Button, Card, Col, Row} from "antd";
import {SINGLE_MEETING} from "../../constants/api";
import {displayMessage, getAPI, interpolate} from "../../utils/common";
import {ERROR_MSG_TYPE, WARNING_MSG_TYPE} from "../../constants/dataKeys";

let signalingSocket = null;   /* our socket.io connection to our webserver */
let localMediaStream = null; /* our own microphone / webcam */
let peers = {};                /* keep track of our peer connections, indexed by peer_id (aka socket.io id) */
let peerMediaElements = {};  /* keep track of our <video>/<audio> tags, indexed by peer_id */
export default class WebCall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myPeerId: null,
            is_admin: false,
            meetingDetails: {},
            SIGNALING_SERVER: "https://bk-erp.plutonic.co.in",
            DEFAULT_CHANNEL: '',
            ICE_SERVERS: [
                {url: "stun:stun.l.google.com:19302"}
            ],
            localMediaComponent: <div />,
            availablePeers: {},
            meetingUserDetails: {}
        }
    }

    componentDidMount() {
        if (this.props.match.params && this.props.match.params.meetingId) {
            this.loadMeeting(this.props.match.params.meetingId);
        }
    }

    setFocusedPeer = (key) => {
        if (!this.state.is_admin) {
            displayMessage(WARNING_MSG_TYPE, "You are not allowed for this action.");
            return false;
        }
        this.setState({
            focusedPeer: key
        })
        signalingSocket.send({admin: key, peer_id: 'admin'});
    }

    loadMeeting = (meetingId) => {
        const that = this;
        const successFn = function (data) {
            let admin = false;
            data.admins.forEach(function (doctor) {
                if (that.props.user.staff && that.props.user.staff.id == doctor) {
                    admin = true;
                }
            });
            that.setState({
                meetingDetails: data,
                is_admin: admin,
            });
            that.changeChannel(data.meeting_id);
        }
        const errorFn = function () {

        }
        getAPI(interpolate(SINGLE_MEETING, [meetingId]), successFn, errorFn);
    }

    changeChannel = (value) => {
        value = value || 'default';
        const that = this;
        this.setState({
            DEFAULT_CHANNEL: value,
        }, function () {
            that.init();
        })
    }

    init = () => {
        const that = this;
        console.log("Connecting to signaling server");
        const {SIGNALING_SERVER, DEFAULT_CHANNEL, ICE_SERVERS} = this.state;
        signalingSocket = io(SIGNALING_SERVER);
        // signalingSocket = io();
        signalingSocket.on('message', function (data) {
            console.log("userDetails", data);
            console.log("admin", data.admin);
            that.setState({
                meetingUserDetails: data
            })
        });
        signalingSocket.on('connect', function () {
            console.log("Connected to signaling server");
            that.setupLocalMedia(function () {
                /* once the user has given us access to their
                 * microphone/camcorder, join the channel and start peering up */
                join_chat_channel(DEFAULT_CHANNEL, {'whatever-you-want-here': 'stuff'});
            });
        });
        signalingSocket.on('disconnect', function () {
            console.log("Disconnected from signaling server");
            /* Tear down all of our peer connections and remove all the
             * media divs when we disconnect */
            // for (peer_id in peerMediaElements) {
            //     peerMediaElements[peer_id].remove();
            // }
            // for (peer_id in peers) {
            //     peers[peer_id].close();
            // }

            peers = {};
            peerMediaElements = {};
        });

        function join_chat_channel(channel, userdata) {
            signalingSocket.emit('join', {"channel": channel, "userdata": userdata});
        }

        function part_chat_channel(channel) {
            signalingSocket.emit('part', channel);
        }


        /**
         * When we join a group, our signaling server will send out 'addPeer' events to each pair
         * of users in the group (creating a fully-connected graph of users, ie if there are 6 people
         * in the channel you will connect directly to the other 5, so there will be a total of 15
         * connections in the network).
         */
        signalingSocket.on('addPeer', function (config) {
            console.log('Signaling server said to add peer:', config);
            const {peer_id} = config;
            if (peer_id in peers) {
                /* This could happen if the user joins multiple channels where the other peer is also in. */
                console.log("Already connected to peer ", peer_id);
                return;
            }
            const peer_connection = new RTCPeerConnection(
                {"iceServers": ICE_SERVERS},
                {"optional": [{"DtlsSrtpKeyAgreement": true}]} /* this will no longer be needed by chrome
                                                                        * eventually (supposedly), but is necessary
                                                                        * for now to get firefox to talk to chrome */
            );
            console.log("New Peer Connection", peer_connection);
            peers[peer_id] = peer_connection;


            peer_connection.onicecandidate = function (event) {
                if (event.candidate) {
                    signalingSocket.emit('relayICECandidate', {
                        'peer_id': peer_id,
                        'ice_candidate': {
                            'sdpMLineIndex': event.candidate.sdpMLineIndex,
                            'candidate': event.candidate.candidate
                        }
                    });
                }
            }
            peer_connection.onaddstream = function (event) {
                console.log("onAddStream", event);
                const remote_media = (
                    <video
                      key={peer_id}
                      ref={video => {
                            if (video)
                                video.srcObject = event.stream
                        }}
                      autoPlay
                      style={{width: '100%'}}
                    />
                );
                peerMediaElements[peer_id] = remote_media;
                that.setState(function (prevState) {
                    return {availablePeers: {...prevState.availablePeers, [peer_id]: true}}
                })
            }
            /* Add our local stream */
            peer_connection.addStream(localMediaStream);


            /* Only one side of the peer connection should create the
             * offer, the signaling server picks one to be the offerer.
             * The other user will get a 'sessionDescription' event and will
             * create an offer, then send back an answer 'sessionDescription' to us
             */
            if (config.should_create_offer) {
                console.log("Creating RTC offer to ", peer_id);
                peer_connection.createOffer(
                    function (local_description) {
                        console.log("Local offer description is: ", local_description);
                        peer_connection.setLocalDescription(local_description,
                            function () {
                                signalingSocket.emit('relaySessionDescription',
                                    {'peer_id': peer_id, 'session_description': local_description});
                                console.log("Offer setLocalDescription succeeded");
                            },
                            function () {
                                displayMessage(ERROR_MSG_TYPE, "Offer setLocalDescription failed!");
                            }
                        );
                    },
                    function (error) {
                        console.log("Error sending offer: ", error);
                    });
            }
        });


        /**
         * Peers exchange session descriptions which contains information
         * about their audio / video settings and that sort of stuff. First
         * the 'offerer' sends a description to the 'answerer' (with type
         * "offer"), then the answerer sends one back (with type "answer").
         */
        signalingSocket.on('sessionDescription', function (config) {
            console.log('Remote description received: ', config);
            const {peer_id} = config;
            const peer = peers[peer_id];
            const remote_description = config.session_description;
            console.log(config.session_description);
            const userData = {...that.props.user, peer_id};
            if (that.state.is_admin || userData.is_superuser) {
                userData.admin = true;
                signalingSocket.send({admin: peer_id, peer_id: 'admin'});
            }
            that.setState({
                myPeerId: config.peer_id
            })
            signalingSocket.send(userData);
            const desc = new RTCSessionDescription(remote_description);
            const stuff = peer.setRemoteDescription(desc,
                function () {
                    console.log("setRemoteDescription succeeded");
                    if (remote_description.type == "offer") {
                        console.log("Creating answer");
                        peer.createAnswer(
                            function (local_description) {
                                console.log("Answer description is: ", local_description);
                                peer.setLocalDescription(local_description,
                                    function () {
                                        signalingSocket.emit('relaySessionDescription',
                                            {'peer_id': peer_id, 'session_description': local_description});
                                        console.log("Answer setLocalDescription succeeded");
                                    },
                                    function () {
                                        displayMessage(ERROR_MSG_TYPE, "Answer setLocalDescription failed!");
                                    }
                                );
                            },
                            function (error) {
                                console.log("Error creating answer: ", error);
                                console.log(peer);
                            });
                    }
                },
                function (error) {
                    console.log("setRemoteDescription error: ", error);
                }
            );
            console.log("Description Object: ", desc);

        });

        /**
         * The offerer will send a number of ICE Candidate blobs to the answerer so they
         * can begin trying to find the best path to one another on the net.
         */
        signalingSocket.on('iceCandidate', function (config) {
            const peer = peers[config.peer_id];
            const {ice_candidate} = config;
            peer.addIceCandidate(new RTCIceCandidate(ice_candidate));
        });


        /**
         * When a user leaves a channel (or is disconnected from the
         * signaling server) everyone will recieve a 'removePeer' message
         * telling them to trash the media channels they have open for those
         * that peer. If it was this client that left a channel, they'll also
         * receive the removePeers. If this client was disconnected, they
         * wont receive removePeers, but rather the
         * signalingSocket.on('disconnect') code will kick in and tear down
         * all the peer sessions.
         */
        signalingSocket.on('removePeer', function (config) {
            console.log('Signaling server said to remove peer:', config);
            const {peer_id} = config;
            // if (peer_id in peerMediaElements) {
            peerMediaElements[peer_id] = <video src="" />;
            // }
            // if (peer_id in peers) {
            peers[peer_id].close();
            // }
            //
            delete peers[peer_id];
            delete peerMediaElements[config.peer_id];
            that.setState(function (prevState) {
                const availablePeers = {...prevState.availablePeers};
                delete availablePeers[peer_id];
                return {availablePeers: {...availablePeers}}
            }, function () {

            });

        });
    }


    /** ******************** */
    /** Local media stuff * */
    /** ******************** */
    setupLocalMedia = (callback, errorback) => {
        const that = this;
        if (localMediaStream != null) {  /* ie, if we've already been initialized */
            if (callback) callback();
            return;
        }
        /* Ask user for permission to use the computers microphone and/or camera,
         * attach it to an <audio> or <video> tag if they give us access. */
        console.log("Requesting access to local audio / video inputs");


        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);


        navigator.getUserMedia({"audio": true, "video": true},
            function (stream) { /* user accepted access to a/v */
                console.log("Access granted to audio/video");
                localMediaStream = stream;
                const localMedia = (
                    <video
                      key="me"
                      muted
                      autoPlay
                      style={{width: '100%'}}
                      ref={video => {
                            if (video)
                                video.srcObject = stream
                        }}
                    />
                );
                that.setState({
                    localMediaComponent: localMedia
                })

                if (callback) callback();
            },
            function () { /* user denied access to a/v */
                console.log("Access denied for audio/video");
                alert("You chose not to provide access to the camera/microphone, demo will not work.");
                if (errorback) errorback();
            });
    }

    render() {
        const {localMediaComponent, availablePeers, meetingUserDetails, meetingDetails, myPeerId} = this.state;
        const availablePeersIdArray = Object.keys(availablePeers);
        return (
            <div style={{minHeight: '100vh', textAlign: 'center'}}>
                <h3>{meetingDetails.name}</h3>
                <Row type="flex" justify="center" gutter={16} style={{marginTop: 10}}>
                    {meetingUserDetails.me && meetingUserDetails.me.socket === meetingUserDetails.admin ? (
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} key={myPeerId}>
                            <Card bodyStyle={{padding: 0, textAlign: 'center'}}>
                                {localMediaComponent}
                                <h4>{meetingUserDetails[meetingUserDetails.admin] ? meetingUserDetails[meetingUserDetails.admin].first_name : '--'} </h4>
                            </Card>
                        </Col>
                    ) : availablePeersIdArray.map(key => {
                        if (meetingUserDetails.admin === key)
                            return (
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} key={key}>
                                    <Card bodyStyle={{padding: 0, textAlign: 'center'}}>
                                        {peerMediaElements[key]}
                                        <h4>{meetingUserDetails[key] ? meetingUserDetails[key].first_name : '--'}
                                            <Button
                                              type="danger"
                                              shape="circle"
                                              icon="close"
                                              onClick={() => this.setFocusedPeer(meetingUserDetails.me ? meetingUserDetails.me.socket : null)}
                                              style={{float: 'right'}}
                                            />
                                        </h4>
                                    </Card>
                                </Col>
                            );
                        return null;
                    })}
                    {/* {focusedPeer ? <Col xs={24} sm={12} md={12} lg={12} xl={12} key={focusedPeer}> */}
                    {/*        <Card bodyStyle={{padding: 0, textAlign: 'center'}}> */}
                    {/*            {peerMediaElements[focusedPeer]} */}
                    {/*            <h4>{meetingUserDetails[focusedPeer] ? meetingUserDetails[focusedPeer].first_name : '--'} */}
                    {/*                <Button type="danger" shape="circle" icon="close" onClick={() => this.setFocusedPeer(myPeerId)} */}
                    {/*                        style={{float: 'right'}}/> */}
                    {/*            </h4> */}
                    {/*        </Card> */}
                    {/*    </Col> : */}
                    {/*    null */}
                    {/* } */}
                </Row>
                <Row gutter={16} style={{marginTop: 10}} type="flex" justify="center">
                    <Col xs={24} sm={12} md={4} lg={4} xl={3}>
                        <Card key="me" bodyStyle={{padding: 0, textAlign: 'center'}}>
                            {localMediaComponent}
                            <h4>ME</h4>
                        </Card>
                    </Col>
                    {availablePeersIdArray.map(key => {
                        return (
                            <Col xs={8} sm={8} md={4} lg={4} xl={3} key={key} onClick={() => this.setFocusedPeer(key)}>
                                <Card bodyStyle={{padding: 0, textAlign: 'center'}}>{peerMediaElements[key]}
                                    <h4>{meetingUserDetails[key] ? meetingUserDetails[key].first_name : '--'}</h4>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }

}
