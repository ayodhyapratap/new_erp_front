import React from "react";
import {Statistic ,Divider,Table} from "antd"
import {EMR_REPORTS, } from "../../../constants/api";
import {getAPI, displayMessage, interpolate} from "../../../utils/common";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label,Legend} from 'recharts';
import moment from "moment";

export default class DailyTreatmentsCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: [],
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            loading: true,

        }
        this.loadDailyTreatments = this.loadDailyTreatments.bind(this);
    }
    componentDidMount() {
        this.loadDailyTreatments();
    }

    componentWillReceiveProps(newProps) {
        let that = this;
        if (this.props.startDate != newProps.startDate || this.props.endDate != newProps.endDate ||this.props.doctors!=newProps.doctors ||this.props.is_complete!=newProps.is_complete )
            this.setState({
                startDate: newProps.startDate,
                endDate: newProps.endDate
            }, function () {
                that.loadDailyTreatments();
            })
    }

    loadDailyTreatments() {
        let that = this;
        that.setState({
            loading: true
        })
        let successFn = function (data) {
            that.setState({
                report: data.data,
                total:data.total,
                loading: false
            });
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
    }
    render() {
        let that=this;
        let i = 1;
        const columns = [{
            title: 'S. No',
            key: 'sno',
            render: (item, record) => <span> {i++}</span>,
            width: 50
        },{
            title: 'Day',
            key: 'date',
            render:((item, record) => <span>{moment(record.date).format('ll')}</span>)
        },{
            title:'Total Treatments',
            key:'count',
            dataIndex:'count',
        }];
        const CustomizedAxisTick = (x,y,value)=>({
            render () {
                // const {x, y, stroke, payload} = this.props;

                return (
                    <g transform={`translate(${x},${y})`}>
                        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{value}</text>
                    </g>
                );
            }
        });

        return <div>
            <h2>Daily Treatments Count</h2>
            <LineChart width={1000} height={300} data={this.state.report}
                       margin={{top: 5, right: 30, left: 20, bottom: 55}}>

                <XAxis dataKey="date" tickFormatter={(value) => {
                    return moment(value).format('DD MMM')
                }}
                       label= {{value:"Data Range", offset:0, margin:{top:10}, position:"insideBottom"}} />
                {/*</XAxis>*/}

                <YAxis label={{ value: 'Total Treatments', angle: -90, position: 'insideLeft' }} />

                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={4}/>
            </LineChart>

            <Divider><Statistic title="Total Patients" value={this.state.total} /></Divider>
            <Table
                loading={this.state.loading}
                columns={columns}
                pagination={false}
                dataSource={this.state.report}/>
        </div>
    }
}