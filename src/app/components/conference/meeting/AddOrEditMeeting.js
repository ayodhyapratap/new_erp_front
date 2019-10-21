import React from "react";
import {Button, Card, DatePicker, Form, Input, InputNumber, Select, Spin, Icon, Col, Row} from "antd";
import {getAPI, interpolate, postAPI} from "../../../utils/common";
import {MEETING_USER, MEETINGS, SEARCH_PATIENT} from "../../../constants/api";
import {loadDoctors} from "../../../utils/clinicUtils";
import {MAX_PARTICIPANT} from "../../../constants/dataKeys";
import moment from "moment";

let id = 0;

class AddOrEditMeeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientListData: [],
            fetching: false,
            no_of_participant: 1,
            practiceDoctors: [],
            zoom_user: [],
            add_new_user: false,
            startSchedule: this.props ? moment(this.props.startTime).format() : moment(),
        };
        this.loadPatient = this.loadPatient.bind(this);
        this.loadZoomUser = this.loadZoomUser.bind(this);
    }

    componentWillMount() {
        this.loadPatient();
        loadDoctors(this);
        this.loadZoomUser();
    }

    loadPatient = (value) => {
        let that = this;
        this.setState({
            fetching: true,
        });
        let successFn = function (data) {
            if (data.results.length > 0) {
                that.setState({
                    patientListData: data.results,
                    fetching: false,
                })
                // console.log("list",that.state.patientListData);
            }
        };
        let errorFn = function () {
        };
        if (value) {
            getAPI(interpolate(SEARCH_PATIENT, [value]), successFn, errorFn);
        }

    };

    loadZoomUser() {
        let that = this;
        let successFn = function (data) {
            that.setState({
                zoom_user: data,
            })
        }
        let errorFn = function () {

        }
        getAPI(MEETING_USER, successFn, errorFn);
    }

    onChangeParticipant(value) {
        this.setState({
            no_of_participant: value
        })
    }

    handleSubmit = (e) => {
        let that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let reqData = values;
                let participant_count = 0;
                if (values.doctors) {
                    participant_count += values.doctors.length;
                    let iterator_doctor = values.doctors.values();
                    let choose_doctor = [];
                    for (let doctors of iterator_doctor) {
                        choose_doctor.push({doctor: doctors})
                    }
                    reqData.doctors = choose_doctor;

                }
                if (values.patients) {
                    participant_count += values.patients.length;
                    let choose_patient = [];
                    let iterator_patient = values.patients.values();
                    for (let patients of iterator_patient) {
                        choose_patient.push({patient: patients})
                    }
                    reqData.patients = choose_patient;
                }
                if (values.other_user) {
                    participant_count += values.other_user.length;
                }
                let successFn = function (data) {

                };
                let errorFn = function () {

                };
                if (values.participants >= participant_count) {
                    console.log(reqData);
                    postAPI(MEETINGS, reqData, successFn, errorFn);
                }

            }
        });
    };

    addNewUser = () => {
        let that = this;
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };
    removeNewOptionField = (k) => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        // if (keys.length === 1) {
        //     return;
        // }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    render() {
        let that = this;
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 8},
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 20, offset: 4},
            },
        };
        // const patientField =()=> {
        //     let fields = [];
        //     for (var i = 0; i <this.state.no_of_participant; i++) {
        //        fields.push(<Form.Item label={"Patient"} {...formItemLayout} key={i}>
        //            {getFieldDecorator(`names[${i}]`, {initialValue: ''})
        //            (<Select notFoundContent={this.state.fetching ? <Spin size="small"/> : null}
        //                     placeholder="Select Patient" style={{width: '100%'}}
        //                     showSearch labelInValue onSearch={this.loadPatient} filterOption={false} >
        //
        //                {this.state.patientListData.map(option => (
        //                    <Select.Option key={option.user.id}>{option.user.first_name}</Select.Option>))}
        //            </Select>)
        //            }
        //        </Form.Item>)
        //     }
        //     return fields;
        // }

        const addNewUserFields = () => {

        }
        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');
        let chooseOption = keys.map((k, index) => (<div><Col span={6} offset={4}>
                <Form.Item label={"First Name"} key={k}>
                    {getFieldDecorator(`others[${k}][first_name]`, {initialValue: ''})
                    (<Input placeholder={"First Name"}/>)
                    }
                </Form.Item>
            </Col>
                <Col span={4}>
                    <Form.Item label={"Last Name"}>
                        {getFieldDecorator(`others[${k}][last_name]`, {initialValue: ''})
                        (<Input placeholder={"Last Name"}/>)
                        }
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={"Email Id"}>
                        {getFieldDecorator(`others[${k}][email]`, {initialValue: ''})
                        (<Input placeholder={"Email Id"}/>)
                        }
                    </Form.Item>

                </Col>
                <Col span={4}>
                    <Form.Item label={"phone"}>
                        {getFieldDecorator(`others[${k}][phone]`, {initialValue: ''})
                        (<Input placeholder={"Phone Number"}/>)
                        }
                    </Form.Item>

                </Col>

                <Col span={2}>
                    <Form.Item label={' '} colon={false}>
                        <Button shape="circle" onClick={() => that.removeNewOptionField(k)}>
                            <Icon className="dynamic-delete-button" type="minus-circle-o"/>
                        </Button>
                        <br/>
                    </Form.Item>
                </Col>
            </div>
        ));

        return (<Card title={"Add Booking"}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label={"Purpose"} {...formItemLayout}>
                        {getFieldDecorator('purpose', {initialValue: ''})
                        (<Input placeholder={"Purpose"}/>)
                        }
                    </Form.Item>
                    <Form.Item label={"No. of Participants"} {...formItemLayout}>
                        {getFieldDecorator('participants', {initialValue: '1'})
                        (<InputNumber placeholder={"No. of Participants"} min={1} max={MAX_PARTICIPANT}
                                      onChange={(value) => this.onChangeParticipant(value)}/>)

                        }
                    </Form.Item>

                    <Form.Item label={"Patients"} {...formItemLayout} key={'patient'}>
                        {getFieldDecorator('patients', {initialValue: []})
                        (<Select mode={"multiple"} notFoundContent={this.state.fetching ? <Spin size="small"/> : null}
                                 placeholder="Select Patient" style={{width: '100%'}}
                                 showSearch onSearch={this.loadPatient} filterOption={false}>

                            {this.state.patientListData.map(option => (
                                <Select.Option value={option.user.id}>{option.user.first_name}</Select.Option>))}
                        </Select>)
                        }
                    </Form.Item>
                    {/*{patientField()}*/}
                    <Form.Item label={"Doctors"} {...formItemLayout} key={'doctors'}>
                        {getFieldDecorator('doctors', {initialValue: []})
                        (<Select placeholder="Select Doctors" style={{width: '100%'}} showSearch mode={"multiple"}>

                            {this.state.practiceDoctors.map(option => (
                                <Select.Option key={option.user.id}>{option.user.first_name}</Select.Option>))}
                        </Select>)
                        }

                    </Form.Item>

                    <Form.Item label={"Meeting User"} {...formItemLayout} key={'zoom_user'}>
                        {getFieldDecorator('zoom_user', {initialValue: []})
                        (<Select placeholder="Select Zoom User" style={{width: '100%'}}>

                            {this.state.zoom_user.map(option => (
                                <Select.Option key={option.id}>{option.username}</Select.Option>))}
                        </Select>)
                        }

                    </Form.Item>

                    <Row gutter={16}>
                        {chooseOption}
                    </Row>

                    {/*{this.state.add_new_user?<Form.Item label={"No. Of New Participants"} {...formItemLayout} >*/}
                    {/*    {getFieldDecorator('no_of_new_participant',{initialValue:''})*/}
                    {/*    (<InputNumber placeholder={"number"} onChange={(value)=>this.newParticipant(value)}/>)*/}
                    {/*    }*/}
                    {/*</Form.Item>:null}*/}

                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <a onClick={() => this.addNewUser()}> <Icon type="plus"/> Add New User</a>
                    </Form.Item>


                    <Form.Item label={"Booking From"} {...formItemLayout}>

                        {getFieldDecorator('form', {initialValue: that.state.startSchedule && moment(that.state.startSchedule).isValid() ? moment(that.state.startSchedule) : (that.props.startTime && moment(that.props.startTime).isValid() ? moment(that.props.startTime) : null)})
                        (<DatePicker format="YYYY/MM/DD HH:mm" showTime/>)
                        }
                    </Form.Item>

                    <Form.Item label={"Duration"} {...formItemLayout}>
                        {getFieldDecorator('duration', {initialValue: '30'})
                        (<InputNumber/>)

                        }
                        <span className="ant-form-text">Minutes</span>
                    </Form.Item>
                    <Form.Item {...formItemLayout}>
                        <Button type="primary" htmlType="submit" style={{margin: 5}}>
                            Submit
                        </Button>
                        {that.props.history ?
                            <Button style={{margin: 5}} onClick={() => that.props.history.goBack()}>
                                Cancel
                            </Button> : null}
                    </Form.Item>
                </Form>
            </Card>

        )
    }
}

export default Form.create()(AddOrEditMeeting)