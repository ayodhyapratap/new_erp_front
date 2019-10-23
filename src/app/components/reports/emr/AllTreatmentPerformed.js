import React from "react";
import {Col, Divider, Row, Statistic, Table} from "antd";
import {EMR_REPORTS} from "../../../constants/api";
import {getAPI,  interpolate} from "../../../utils/common";
import moment from "moment"
import InfiniteFeedLoaderButton from "../../common/InfiniteFeedLoaderButton";
import CustomizedTable from "../../common/CustomizedTable";

export default class AllTreatmentPerformed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            loading: false,
            treatmentPerformed:[],
        }
        this.loadTreatmentsReport = this.loadTreatmentsReport.bind(this);
    }

    componentDidMount() {
        this.loadTreatmentsReport();
    }

    componentWillReceiveProps(newProps) {
        let that = this;
        if (this.props.startDate != newProps.startDate || this.props.endDate != newProps.endDate ||this.props.doctors!=newProps.doctors ||this.props.is_complete!=newProps.is_complete)
            this.setState({
                startDate: newProps.startDate,
                endDate: newProps.endDate
            },function(){
                that.loadTreatmentsReport();
            })

    }

    loadTreatmentsReport = () => {
        let that = this;
        that.setState({
            loading:true,
        });
        let successFn = function (data) {
           that.setState({
               treatmentPerformed:data,
               loading: false,
           })
        };

        let errorFn = function () {
            that.setState({
                loading: false
            })
        };
        let apiParams={
            type:that.props.type,
            start: this.state.startDate.format('YYYY-MM-DD'),
            end: this.state.endDate.format('YYYY-MM-DD'),
            is_complete:this.props.is_complete?true:false,
        };
        if(this.props.doctors){
            apiParams.doctors=this.props.doctors.toString();
        }
        getAPI(interpolate(EMR_REPORTS, [that.props.active_practiceId]), successFn, errorFn, apiParams);
    };

    render() {
        let that=this;
        let i=1;
        const columns = [{
            title: 'S. No',
            key: 'sno',
            render: (item, record) => <span> {i++}</span>,
            export:(item,record,index)=>index+1,
            width: 50
        },{
            title: 'Performed On',
            key: 'date',
            render: (text, record) => (
                <span>
                {moment(record.schedule_at).format('DD MMM YYYY')}
                  </span>
            ),
            export:(item,record)=>(moment(record.schedule_at).format('DD MMM YYYY')),
        },{
            title: 'Name',
            dataIndex: 'procedure_name',
            key: 'procedure_name',
        },{
            title:'Performed by',
            key:'doctor',
            dataIndex:'doctor',
        },{
            title:'Total Treatments',
            key:'quantity',
            dataIndex:'quantity',
        }];
        var totalTreatments = this.state.treatmentPerformed.reduce(function(prev, cur) {
                 return prev + cur.quantity;
             }, 0);
        return <div>
            <Row>
                <Col span={12} offset={6} style={{textAlign:"center"}}>
                    <Statistic title="Total Treatments" value={totalTreatments} />
                    <br/>
                </Col>
            </Row>

            <CustomizedTable
                loading={this.state.loading}
                columns={columns}
                dataSource={this.state.treatmentPerformed}/>

        </div>
    }
}
