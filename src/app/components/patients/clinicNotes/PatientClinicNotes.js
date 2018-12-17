import {Button, Card, Checkbox, Divider, Icon, Skeleton, Table} from "antd";
import React from "react";
import {getAPI, interpolate} from "../../../utils/common";
import {DRUG_CATALOG, PATIENT_CLINIC_NOTES_API, PRESCRIPTIONS_API} from "../../../constants/api";
import moment from "moment";
import {Route, Switch} from "react-router";
import AddorEditPatientPrescriptions from "../prescriptions/AddorEditPatientPrescriptions";
import {Link} from "react-router-dom";

class PatientClinicNotes extends React.Component {
    constructor(props){
        super(props);
        super(props);
        this.state = {
            currentPatient:this.props.currentPatient,
            active_practiceId:this.props.active_practiceId,
            clinicNotes:[],
            editClinicNotes: null,
        }
        this.loadClinicNotes =this.loadClinicNotes.bind(this);
        this.editClinicNotesData =this.editClinicNotesData.bind(this);

    }
    componentDidMount(){
        if(this.props.match.params.id){
            this.loadClinicNotes();
        }

    }
    loadClinicNotes(){
        let that = this;
        let successFn =function (data){
            that.setState({
                clinicNotes:data
            })
        }
        let errorFn = function (){

        }
        getAPI(interpolate(PATIENT_CLINIC_NOTES_API,[this.props.match.params.id]), successFn, errorFn)
    }


    editClinicNotesData(record){
        this.setState({
            editClinicNotes:record,
        });
        let id=this.props.match.params.id
        this.props.history.push("/patient/"+id+"/emr/clinicnotes/edit")

    }

    render(){

        const columns = [{
            title: 'Time',
            dataIndex: 'created_at',
            key: 'name',
            render: created_at =><span>{moment(created_at).format('LLL')}</span>,
        },{
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'chief_complaints',
            dataIndex: 'chief_complaints',
            key: 'chief_complaints',
        },{
            title: 'investigations',
            dataIndex: 'investigations',
            key: 'investigations',
        }, {
            title: 'diagnosis',
            dataIndex: 'diagnosis',
            key: 'diagnosis',
        }, {
            title: 'notes',
            dataIndex: 'notes',
            key: 'notes',
        }, {
            title: 'observations',
            dataIndex: 'observations',
            key: 'observations',
        }, {
            title: 'Active',
            key: 'is_active',
            render:(text, record) => (
                <Checkbox checked={record.is_active}/>
            )
        },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                <a onClick={()=>this.editClinicNotesData(record)}>Edit</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
              </span>
            ),
        }];

        if(this.props.match.params.id){
            return <div><Switch>
                {/*<Route exact path='/patient/:id/emr/clinicnotes/add'*/}
                       {/*render={(route) => <AddorEditPatientclinicnotes{...this.state} loadClinicNotes={this.loadClinicNotes()} {...route}/>}/>*/}
                {/*<Route exact path='/patient/:id/emr/clinicnotes/edit'*/}
                       {/*render={(route) => <AddorEditPatientclinicnotes {...this.state} {...route}/>}/>*/}
                <Card title={ this.state.currentPatient?this.state.currentPatient.name + " clinicnotes":"clinicnotes"}  extra={<Button.Group>
                    <Link to={"/patient/"+this.props.match.params.id+"/emr/clinicnotes/add"}><Button><Icon type="plus"/>Add</Button></Link>
                </Button.Group>}>

                    <Table columns={columns}  dataSource={this.state.clinicNotes} />

                </Card>
            </Switch>

            </div>
        }
        else{
            return <Card>
                <h2> select patient to further continue</h2>
            </Card>
        }

    }
}

export default PatientClinicNotes;
