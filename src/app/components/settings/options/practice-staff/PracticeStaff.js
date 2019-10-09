import React from "react";
import DynamicFieldsForm from "../../../common/DynamicFieldsForm";
import {
    Button,
    Checkbox,
    Card,
    Form,
    Icon,
    Tabs,
    Divider,
    Tag,
    Row,
    Table,
    Modal,
    Popconfirm,
    Switch as AntSwitch, Spin
} from "antd";
import {
    CHECKBOX_FIELD,
    DOCTORS_ROLE,
    INPUT_FIELD,
    RADIO_FIELD,
    SELECT_FIELD,
    SUCCESS_MSG_TYPE
} from "../../../../constants/dataKeys";
import {
    PRACTICESTAFF,
    STAFF_ROLES,
    ALL_PRACTICE_STAFF,
    ALL_PRACTICE_DOCTORS,
    SINGLE_PRACTICE_STAFF_API,
    USER_PRACTICE_PERMISSIONS,
    SET_USER_PERMISSION,
    SET_SPECIFIC_USER_PERMISSION,
    DOCTOR_VISIT_TIMING_API, ENABLE_STAFF_IN_PRACTICE, ALL_PERMISSIONS, UPDATE_BULK_PERMISSIONS
} from "../../../../constants/api"
import {Link, Route, Switch} from "react-router-dom";
import {deleteAPI, displayMessage, getAPI, interpolate, patchAPI, postAPI, putAPI} from "../../../../utils/common";
import {getAllPermissions, loggedInUserPractices} from "../../../../utils/auth";
import moment from "moment";
import DoctorTiming from "./DoctorTiming";
import {DAY_KEYS} from "../../../../constants/hardData";

const {Column, ColumnGroup} = Table;
const TabPane = Tabs.TabPane;
const {confirm} = Modal;

class PracticeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'staff',
            practice_staff: [],
            practice_doctors: [],
            roles: null,
            permissionEditModal: false,
            editPermissions: {},
            allPermissions: [],
            allGlobalPermissions: [],
            loading: true,
            defaultActiveTab: this.props.location.hash,
            doctorsTiming: {},
            bulkEditLoading: false
        }
        this.setPermission = this.setPermission.bind(this);
        this.staffRoles()
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.getAllPermissions();
        this.loadData();
    }

    setPermission(codename, name, e, sendPractice) {
        let that = this;
        let value = e.target.checked;
        this.setState(function (prevState) {
            let permission = {...prevState.editPermissions[codename]}
            permission.loading = true;
            return {editPermissions: {...prevState.editPermissions, [codename]: permission}}
        });
        if (value) {
            let reqData = {
                "name": name,
                "codename": codename,
                "is_active": true,
                "practice": sendPractice ? that.props.active_practiceId : null,
                "staff": that.state.currentUser
            }
            let successFn = function (data) {
                that.setState(function (prevState) {
                    return {editPermissions: {...prevState.editPermissions, [codename]: data}}
                })
            }
            let errorFn = function () {
            }
            postAPI(SET_USER_PERMISSION, reqData, successFn, errorFn);
        } else {
            if (that.state.editPermissions[codename].id) {
                let reqData = {
                    // "name": null,
                    // "codename": codename,
                    "is_active": false,
                    // "practice": that.props.active_practiceId,
                    // "user": that.state.currentUser
                }
                let successFn = function (data) {
                    that.setState(function (prevState) {
                        return {editPermissions: {...prevState.editPermissions, [data.codename]: undefined}}
                    })
                }
                let errorFn = function () {

                }
                patchAPI(interpolate(SET_SPECIFIC_USER_PERMISSION, [that.state.editPermissions[codename].id]), reqData, successFn, errorFn);
            } else {

            }
        }
    }

    getAllPermissions = () => {
        let that = this;
        let successFn = function (data) {
            that.setState({
                allPermissions: data.practice_permissions,
                allGlobalPermissions: data.global_permissions
            })
        }
        let errorFn = function () {
        }
        getAPI(ALL_PERMISSIONS, successFn, errorFn);
    }

    editPermissions(user) {
        let that = this;
        if (!user) {
            that.setState({
                permissionEditModal: false,
            });
            return true
        }

        that.setState({
            permissionEditModal: true,
            editPermissions: [],
            currentUser: user
        });
        let successFn = function (data) {
            let permissions = {}
            data.forEach(function (item) {
                permissions[item.codename] = item
            })
            that.setState({
                editPermissions: permissions
            })
        }
        let errorFn = function () {
        }
        getAPI(interpolate(USER_PRACTICE_PERMISSIONS, [user, that.props.active_practiceId]), successFn, errorFn);
    }

    loadData() {
        this.admin_StaffData();
    }

    deleteStaff(value) {
        var that = this;
        let reqData = {
            is_active: false,
        }
        let successFn = function (data) {

            that.loadData();
        };
        let errorFn = function () {
        };
        putAPI(interpolate(SINGLE_PRACTICE_STAFF_API, [value]), reqData, successFn, errorFn);
    }

    staffRoles() {
        let that = this;
        let successFn = function (data) {
            that.setState({
                roles: data,
            })
        }
        let errorFn = function () {
        }
        getAPI(STAFF_ROLES, successFn, errorFn)
    }

    admin_StaffData() {
        var that = this;
        let successFn = function (data) {
            let doctor = [];
            let staff = [];
            data.staff.forEach(function (usersdata) {
                if (usersdata.role == DOCTORS_ROLE) {
                    doctor.push(usersdata);
                } else {
                    staff.push(usersdata);
                }
            })
            that.setState({
                practice_doctors: doctor,
                practice_staff: staff,
                loading: false
            }, function () {
                that.loadDoctorsTiming();
            })
        };
        let errorFn = function () {
            that.setState({
                loading: false
            })
        };
        getAPI(interpolate(PRACTICESTAFF, [this.props.active_practiceId]), successFn, errorFn, {all: true});
    }


    clinicData() {
        let practice = loggedInUserPractices();
        var practiceKeys = Object.keys(practice);
        var that = this;
        let successFn = function (data) {
            let doctor = [];
            let staff = [];
            data.staff.forEach(function (usersdata) {
                if (usersdata.role == DOCTORS_ROLE) {
                    doctor.push(usersdata);
                } else {
                    staff.push(usersdata);
                }
            })
            that.setState({
                practice_doctors: doctor,
                practice_staff: staff,
            }, function () {
                that.loadDoctorsTiming();
            })
        }
        let errorFn = function () {
        };
        getAPI(interpolate(PRACTICESTAFF, [this.props.active_practiceId]), successFn, errorFn);

    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    loadDoctorsTiming = () => {
        let that = this;
        let doctorList = that.state.practice_doctors.map(doctor => doctor.id);
        let successFn = function (data) {
            that.setState(function (prevState) {
                let timingObject = {}
                data.forEach(function (dataObj) {
                    timingObject[dataObj.doctor.id] = dataObj
                })
                return {doctorsTiming: timingObject}
            })
        }
        let errorFn = function () {

        }
        getAPI(interpolate(DOCTOR_VISIT_TIMING_API, [this.props.active_practiceId]), successFn, errorFn, {
            doctor: doctorList.join(',')
        });
    }
    changeTab = (key) => {
        this.setState({
            defaultActiveTab: key
        });
        this.props.history.push('/settings/clinics-staff' + key);
    }
    toggleEnableStaffPractice = (staff, e) => {
        let that = this;
        let successFn = function (data) {
            if (e)
                displayMessage(SUCCESS_MSG_TYPE, "Staff enabled for this practice successfully!!")
            else
                displayMessage(SUCCESS_MSG_TYPE, "Staff disabled for this practice successfully!!")
            that.admin_StaffData();
        }
        let errorFn = function () {

        }
        postAPI(interpolate(ENABLE_STAFF_IN_PRACTICE, [staff]), {
            practice: that.props.active_practiceId,
            is_active: !!e
        }, successFn, errorFn)
    }
    toggleAllPermissions = (type, value) => {
        let that = this;
        let permissionsArray = [];

        if (type == 'LOCAL') {
            that.state.allPermissions.forEach(function (permission) {
                let permObject = {
                    "name": permission.name,
                    "codename": permission.codename,
                    "is_active": !!value,
                    "practice": that.props.active_practiceId,
                    "staff": that.state.currentUser
                };
                if (that.state.editPermissions[permission.codename]) {
                    permObject.id = that.state.editPermissions[permission.codename].id;
                }
                permissionsArray.push(permObject);
            });
        }
        if (type == 'GLOBAL') {
            that.state.allGlobalPermissions.forEach(function (permission) {
                let permObject = {
                    "name": permission.name,
                    "codename": permission.codename,
                    "is_active": !!value,
                    "practice": that.props.active_practiceId,
                    "staff": that.state.currentUser
                };
                if (that.state.editPermissions[permission.codename]) {
                    permObject.id = that.state.editPermissions[permission.codename].id;
                }
                permissionsArray.push(permObject);
            });
        }
        let successFn = function (data) {
            that.editPermissions(that.state.currentUser);
            that.setState({
                bulkEditLoading: false
            });
        }
        let errorFn = function () {
            that.setState({
                bulkEditLoading: false
            });
        }
        confirm({
            title: 'Are you sure to select all permissions for this user?',
            onOk() {
                that.setState({
                    bulkEditLoading: type
                });
                postAPI(UPDATE_BULK_PERMISSIONS, {permissions: permissionsArray}, successFn, errorFn);
            },
            onCancel() {
                return false;
            },
        })

    }

    render() {
        let that = this;
        const doctorColumns = [{
            title: "Name",
            dataIndex: "user.first_name",
            key: "name",
        }, {
            title: "Email",
            dataIndex: "user.email",
            key: "email",
            render: (value, record) => (record.user && record.user.is_active ? record.user.email : value)
        }, {
            title: "Mobile",
            dataIndex: "user.mobile",
            key: "mobile",
        }, {
            title: "Registration Number",
            dataIndex: "registration_number",
            key: "registration_number",
        }, {
            title: "Enable Staff",
            dataIndex: "in_practice",
            key: "enable_staff",
            render: (item, record) => (record.user && record.user.is_superuser ?
                <Tag color="red">Not Allowed</Tag> :
                <AntSwitch defaultChecked={!!item} onChange={(e) => that.toggleEnableStaffPractice(record.id, e)}/>)
        }, {
            title: "Last Login",
            key: "user",
            render: (text, record) => (record.user && record.user.is_active ? (record.user.last_login ? moment(record.user.last_login).fromNow() : '--') :
                <Tag color="#f50">Activation Pending</Tag>),
        }, {
            title: "Action",
            key: "action",
            render: function (text, record) {
                return <span>
            <Link to={"/settings/clinics-staff/" + record.id + "/edit"}>
              <a>Edit</a>
            </Link>
                     <Divider type="vertical"/>
                    {record.user && record.user.is_superuser ?
                        <Tag color="red">SuperUser</Tag> :
                        <>
                            <a onClick={() => that.editPermissions(record.id)}
                               disabled={!record.in_practice}>Permissions</a>
                            <Divider type="vertical"/>
                            <Popconfirm title="Are you sure delete this staff?"
                                        onConfirm={() => that.deleteStaff(record.id)} okText="Yes" cancelText="No">
                                <a>Delete</a>
                            </Popconfirm>
                        </>}
            </span>
            }
        }];

        const staffColumns = [{
            title: "Name",
            dataIndex: "user.first_name",
            key: "name",
        }, {
            title: "Email",
            dataIndex: "user.email",
            key: "email",
            render: (value, record) => (record.user && record.user.is_active ? record.user.email : value)
        }, {
            title: "Mobile",
            dataIndex: "user.mobile",
            key: "mobile",
        }, {
            title: "Enable Staff",
            dataIndex: "in_practice",
            key: "enable_staff",
            render: (item, record) => (record.user && record.user.is_superuser ?
                <Tag color="red">Not Allowed</Tag> :
                <AntSwitch defaultChecked={!!item} onChange={(e) => that.toggleEnableStaffPractice(record.id, e)}/>)
        }, {
            title: "Last Login",
            key: "user",
            render: (text, record) => (record.user && record.user.is_active ? (record.user.last_login ? moment(record.user.last_login).fromNow() : '--') :
                <Tag color="#f50">Activation Pending</Tag>),
        }, {
            title: "Action",
            key: "action",
            render: function (text, record) {
                return <span>
            <Link to={"/settings/clinics-staff/staff/" + record.id + "/edit"}>
              <a>Edit</a>
            </Link>
                     <Divider type="vertical"/>
                    {record.user && record.user.is_superuser ?
                        <Tag color="red">SuperUser</Tag> :
                        <>
                            <a onClick={() => that.editPermissions(record.id)}
                               disabled={!record.in_practice}>Permissions</a>
                            <Divider type="vertical"/>
                            <Popconfirm title="Are you sure delete this staff?"
                                        onConfirm={() => that.deleteStaff(record.id)} okText="Yes" cancelText="No">
                                <a>Delete</a>
                            </Popconfirm></>}
            </span>
            }
        }];

        const notification_doctor_columns = [{
            title: "Name",
            dataIndex: "user.first_name",
            key: "name",
        }, {
            title: "Confirmation SMS",
            dataIndex: "confirmation_sms",
            key: "confirmation_sms",
            render: confirmation_sms => (
                <span>
            <Checkbox
                checked={confirmation_sms}/>
            </span>),
        }, {
            title: "Schedule SMS",
            dataIndex: "schedule_sms",
            key: "schedule_sms",
            render: schedule_sms => (
                <span>
            <Checkbox checked={schedule_sms}/>
            </span>)
        }, {
            title: "Confirmation EMAIL",
            dataIndex: "confirmation_email",
            key: "confirmation_email",
            render: confirmation_email => (
                <span>
            <Checkbox checked={confirmation_email}/>
            </span>)
        }, {
            title: "Online Appointment SMS",
            dataIndex: "online_appointment_sms",
            key: "online_appointment_sms",
            render: online_appointment_sms => (
                <Checkbox checked={online_appointment_sms}/>
            )
        }, {
            title: "Action",
            key: "action",
            render: function (text, record) {
                return <span>
            <Link to={"/settings/clinics-staff/" + record.id + "/edit"}>
              <a>Edit</a>
            </Link>
            </span>
            }
        }];

        const notification_staff_columns = [{
            title: "Name",
            dataIndex: "user.first_name",
            key: "name",
        }, {
            title: "Confirmation SMS",
            dataIndex: "confirmation_sms",
            key: "confirmation_sms",
            render: confirmation_sms => (
                <span>
            <Checkbox
                checked={confirmation_sms}/>
            </span>),
        }, {
            title: "Schedule SMS",
            dataIndex: "schedule_sms",
            key: "schedule_sms",
            render: schedule_sms => (
                <span>
            <Checkbox checked={schedule_sms}/>
            </span>)
        }, {
            title: "Confirmation EMAIL",
            dataIndex: "confirmation_email",
            key: "confirmation_email",
            render: confirmation_email => (
                <span>
            <Checkbox checked={confirmation_email}/>
            </span>)
        }, {
            title: "Online Appointment SMS",
            dataIndex: "online_appointment_sms",
            key: "online_appointment_sms",
            render: online_appointment_sms => (
                <Checkbox checked={online_appointment_sms}/>
            )
        }, {
            title: "Action",
            key: "action",
            render: function (text, record) {
                return (record.user && record.is_superuser ?
                    <Tag> Not Allowed</Tag> :
                    <span>
            <Link to={"/settings/clinics-staff/staff/" + record.id + "/edit"}>
              <a>Edit</a>
            </Link>
            </span>)
            }
        }];
        return <Row>
            <h2>Practice Staff</h2>
            <Switch>
                <Route path={"/settings/clinics-staff/:docId/edit-timing"}
                       render={(route) => <DoctorTiming {...this.props} {...route} loadData={that.loadData}/>}/>
                <Route>
                    <Card>
                        <Tabs defaultActiveKey={this.state.defaultActiveTab} onChange={this.changeTab}>
                            <TabPane tab={<span><Icon type="user-add"/>Manage Staff</span>} key="#staff">
                                <h2>Doctors
                                    <Link to="/settings/clinics-staff/adddoctor">
                                        <Button type="primary" style={{float: 'right'}}>
                                            <Icon type="plus"/>&nbsp;Add Doctor
                                        </Button>
                                    </Link>
                                    <Link to="/settings/clinics-staff/addstaff">
                                        <Button type="primary" style={{float: 'right', marginRight: '5px'}}>
                                            <Icon type="plus"/>&nbsp;Add Staff
                                        </Button>
                                    </Link>
                                </h2>

                                <Table loading={this.state.loading} pagination={false} columns={doctorColumns}
                                       dataSource={this.state.practice_doctors}/>
                                <Divider/>
                                <h2>Staff </h2>
                                <Table loading={this.state.loading} pagination={false} columns={staffColumns}
                                       dataSource={this.state.practice_staff}/>
                            </TabPane>
                            <TabPane tab={<span><Icon type="team"/>Staff Notification</span>} key="#notification">
                                <h2>Doctors</h2>
                                <Table loading={this.state.loading} pagination={false}
                                       columns={notification_doctor_columns}
                                       dataSource={this.state.practice_doctors}/>
                                <Divider/>
                                <h2>Staff</h2>
                                <Table loading={this.state.loading} pagination={false}
                                       columns={notification_staff_columns}
                                       dataSource={this.state.practice_staff}/>
                            </TabPane>
                            <TabPane tab={<span><Icon type="schedule"/>Doctors visit Timing</span>} key="#timing">
                                <Table loading={this.state.loading} dataSource={this.state.practice_doctors}>
                                    <Column title="Name"
                                            dataIndex="user.first_name"
                                            key="name"
                                    />
                                    <Column title="Visit Timing"
                                            dataIndex="loginstatus"
                                            key="VisitTiming"
                                            render={(text, record) => visitTime(that.state.doctorsTiming[record.id])}
                                    />
                                    <Column title="Action"
                                            key="action"
                                            render={(text, record) => (
                                                <Link to={"/settings/clinics-staff/" + record.id + "/edit-timing"}>
                                                    <a>Edit Timing</a>
                                                </Link>
                                            )}/>
                                </Table>
                            </TabPane>
                        </Tabs>
                        <Modal title="Edit Permissions"
                               visible={this.state.permissionEditModal}
                               onCancel={() => this.editPermissions()}
                               footer={null}>
                            <Spin spinning={this.state.bulkEditLoading == 'LOCAL'}>
                                <Row>
                                    <h3>
                                        <Checkbox
                                            checked={that.state.allPermissions.length && that.state.allPermissions.reduce((a, b) => a && b && that.state.editPermissions[a.codename] && that.state.editPermissions[b.codename])}
                                            onClick={(e) => this.toggleAllPermissions('LOCAL', e.target.checked)}>Select
                                            All
                                            Permissions</Checkbox>
                                    </h3>
                                </Row>
                                {that.state.allPermissions.map(item => <Row>
                                    <Checkbox value={item.codename}
                                              checked={that.state.editPermissions[item.codename]}
                                              disabled={that.state.editPermissions[item.codename] && that.state.editPermissions[item.codename].loading}
                                              onClick={(e) => this.setPermission(item.codename, item.name, e, true)}>{item.id} {item.name}</Checkbox>
                                </Row>)}
                            </Spin>
                            <Divider>Global Permissions</Divider>
                            <Spin spinning={this.state.bulkEditLoading == 'GLOBAL'}>
                                <Row>
                                    <h3>
                                        <Checkbox
                                            checked={that.state.allGlobalPermissions.length && that.state.allGlobalPermissions.reduce((a, b) => a && b && that.state.editPermissions[a.codename] && that.state.editPermissions[b.codename])}
                                            onClick={(e) => this.toggleAllPermissions('GLOBAL', e.target.checked)}>Select
                                            All
                                            Permissions</Checkbox>
                                    </h3>
                                </Row>
                                {that.state.allGlobalPermissions.map(item => <Row>
                                    <Checkbox value={item.codename}
                                              checked={that.state.editPermissions[item.codename]}
                                              disabled={that.state.editPermissions[item.codename] && that.state.editPermissions[item.codename].loading}
                                              onClick={(e) => this.setPermission(item.codename, item.name, e, false)}
                                              style={{display: 'list-item'}}>{item.id} {item.name}</Checkbox></Row>)}
                            </Spin>
                        </Modal>
                    </Card>
                </Route>
            </Switch>

        </Row>
    }
}

function visitTime(visitObj) {
    if (visitObj) {
        return (visitObj.visting_hour_same_week ?
            <span>
                <b>Mon-Sun : </b>{momentTime(visitObj.first_start_time)}
                {visitObj.is_two_sessions ? "-" + momentTime(visitObj.first_end_time) + " ||LUNCH|| " + momentTime(visitObj.second_start_time) : null}
                -{momentTime(visitObj.second_end_time)}
                </span>
            : DAY_KEYS.map(dayKey =>
                visitObj[dayKey] ? <span>
                        <b>{dayKey} : </b>
                    {momentTime(visitObj[`first_start_time_${dayKey}`])}
                    {visitObj[`is_two_sessions_${dayKey}`] ? "-" + momentTime(visitObj[`first_end_time_${dayKey}`]) + "||LUNCH||" + momentTime(visitObj[`second_start_time_${dayKey}`]) : null}
                    -{momentTime(visitObj[`second_end_time_${dayKey}`])}
                    <br/></span> : null
            ))
    }
    return null
}


function momentTime(timeStr) {
    return moment(timeStr, "HH:mm").format("HH:mm")
}

export default PracticeDetails;
