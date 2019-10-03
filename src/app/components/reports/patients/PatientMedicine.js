import React from "react";
import {hideEmail, hideMobile} from "../../../utils/permissionUtils";
import {getAPI} from "../../../utils/common";
import {PATIENTS_REPORTS} from "../../../constants/api";
import {Col, Row, Statistic} from "antd";
import CustomizedTable from "../../common/CustomizedTable";

export default class PatientMedicine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            report:[],

        }
        this.loadPatientMedicine = this.loadPatientMedicine.bind(this);
    }
    componentDidMount() {
        this.loadPatientMedicine();
    }
    componentWillReceiveProps(newProps) {
        let that = this;
        if (this.props.startDate != newProps.startDate || this.props.endDate != newProps.endDate ||this.props.patient_groups !=newProps.patient_groups
            ||this.props.blood_group !=newProps.blood_group || this.props.blood_group !=newProps.blood_group)
            this.setState({
                startDate: newProps.startDate,
                endDate: newProps.endDate
            }, function () {
                this.loadPatientMedicine();
            })
    }
    loadPatientMedicine() {
        let that = this;

        let successFn = function (data) {
            that.setState({
                report:data,
            })
        };
        let errorFn = function () {
            that.setState({
                loading: false
            })
        };
        let apiParams={
            follow_start: this.props.startDate.format('YYYY-MM-DD'),
            follow_end: this.props.endDate.format('YYYY-MM-DD'),
            type:this.props.type,
        };
        if (this.props.patient_groups){
            apiParams.groups=this.props.patient_groups.toString();
        }
        if (this.props.blood_group){
            apiParams.blood_group=this.props.blood_group;
        }
        getAPI(PATIENTS_REPORTS,  successFn, errorFn,apiParams);
    }
    render() {
        let that=this;
        let i = 1;
        const columns = [{
            title: 'S. No',
            key: 'sno',
            dataIndex:'sno',
            render: (item, record) => <span> {i++}</span>,
            export:(item,record,index)=>index+1,
            width: 50
        },{
            title: 'Patient Name',
            dataIndex: 'user.first_name',
            key: 'first_name',
        },{
            title:'Patient Number',
            key:'id',
            render:(item ,record)=><span>{record.custom_id?record.custom_id:record.id}</span>,
            exports:(item ,record) =>(record.custom_id?record.custom_id:record.id),
        }, {
            title: 'Mobile Number',
            key: 'user.mobile',
            dataIndex:'user.mobile',
            render: (value) => that.props.activePracticePermissions.PatientPhoneNumber ? value : hideMobile(value),
            exports:(value)=>(value),
        },{
            title:'Email',
            key:'user.email',
            dataIndex:'user.email',
            render:(value)=>that.props.activePracticePermissions.PatientEmailId ? value : hideEmail(value),
            exports:(value)=>(value),
        }, {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
        }];
        return <div>
            <h2>Patient Medicine Report</h2>
            <Row>
                <Col span={12} offset={6} style={{textAlign:"center"}}>
                    <Statistic title="Total Patients" value={this.state.report.length} />
                    <br/>
                </Col>
            </Row>

            <CustomizedTable
                loading={this.state.loading}
                columns={columns}
                dataSource={this.state.report}/>

        </div>
    }
}