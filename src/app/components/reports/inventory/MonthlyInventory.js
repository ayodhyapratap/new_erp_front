import React from "react";
import {Empty, Select, Spin} from "antd"
import {INVENTORY_REPORT_API,} from "../../../constants/api";
import {getAPI} from "../../../utils/common";
import {XAxis, YAxis,Bar, Tooltip, ComposedChart} from 'recharts';
import moment from "moment";
import CustomizedTable from "../../common/CustomizedTable";
import {TYPE_OF_CONSUMPTION} from "../../../constants/hardData";
import {loadMailingUserListForReportsMail, sendReportMail} from "../../../utils/clinicUtils";

export default class MonthlyInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: [],
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            loading: false,
            mailingUsersList: []

        }
        this.loadMonthlyInventory = this.loadMonthlyInventory.bind(this);
    }
    componentDidMount() {
        this.loadMonthlyInventory();
        loadMailingUserListForReportsMail(this);
    }

    componentWillReceiveProps(newProps) {
        let that = this;
        if (this.props.startDate != newProps.startDate || this.props.endDate != newProps.endDate ||this.props.product_item!=newProps.product_item ||this.props.consume!=newProps.consume)
            this.setState({
                startDate: newProps.startDate,
                endDate: newProps.endDate
            }, function () {
                that.loadMonthlyInventory();
            })
    }

    loadMonthlyInventory() {
        let that = this;
        that.setState({
            loading: true
        })
        let successFn = function (data) {
            that.setState({
                report: data,
                loading: false
            });
        };
        let errorFn = function () {
            that.setState({
                loading: false
            })
        };
        let apiParams={
            start: this.state.startDate.format('YYYY-MM-DD'),
            end: this.state.endDate.format('YYYY-MM-DD'),
            type:that.props.type,
        };
        if(this.props.consume){
            apiParams.consume=this.props.consume.toString();
        }
        if(this.props.product_item){
            apiParams.product=this.props.product_item;
        }
        getAPI(INVENTORY_REPORT_API , successFn, errorFn, apiParams);
    }

    sendMail = (mailTo) => {
        let that=this;
        let apiParams={
            start: this.state.startDate.format('YYYY-MM-DD'),
            end: this.state.endDate.format('YYYY-MM-DD'),
            type:that.props.type,
        };
        if(this.props.consume){
            apiParams.consume=this.props.consume.toString();
        }
        if(this.props.product_item){
            apiParams.product=this.props.product_item;
        }
        apiParams.mail_to = mailTo;
        sendReportMail(INVENTORY_REPORT_API, apiParams)
    }

    render() {
        let that=this;

        let currentData=that.state.report;
        let dailyReports=[];
        let itemDate={};
        let j=0;
        for (i = 0; i < currentData.length; i++) {
            if(currentData[i]["date"] in itemDate){
                itemDate[currentData[i]["date"]][currentData[i]["type_of_consumption"]] = currentData[i]["consume"];
            }else{
                itemDate[currentData[i]["date"]] = {"SERVICES": 0,"SALES": 0,"DAMAGED": 0,"RETURNED": 0,"ADJUSTMENT": 0};
                itemDate[currentData[i]["date"]][currentData[i]["type_of_consumption"]] = currentData[i]["consume"];
            }
        }


        for(let key in itemDate){
            let inner = {"item_date":key,"type": itemDate[key],"total_consumption": 0}
            let total = itemDate[key]["SERVICES"] + itemDate[key]["SALES"] + itemDate[key]["DAMAGED"] + itemDate[key]["RETURNED"] + itemDate[key]["ADJUSTMENT"];
            inner["total_consumption"] = total;
            dailyReports.push(inner);
        }
        let i = 1;
        let columns = [{
            title: 'S. No',
            key: 'sno',
            render: (item, record) => <span> {i++}</span>,
            export: (item, record, index) => index + 1,
            width: 50
        },{
            title: 'Month',
            key: 'date',
            dataIndex:'item_date',
            render:((item, record) => <span>{moment(record.item_date).format('MMM YYYY')}</span>),
            export:(item,record)=>(moment(record.item_date).format('MMM YYYY')),
        }];
        for(let x=0;x<TYPE_OF_CONSUMPTION.length;x++){
            let valueK=TYPE_OF_CONSUMPTION[x].value;
            let obj = {
                title: TYPE_OF_CONSUMPTION[x].label,
                key: TYPE_OF_CONSUMPTION[x].value,
                render:((item, record) => <span>{record.type[valueK]}</span>),
                export:(item,record)=>(record.type.value),
            }
            if (that.props.consume.includes(TYPE_OF_CONSUMPTION[x].value)){
                columns.push(obj);
            }
        }
        columns.push({
                title:'Total Consumption',
                key:'total_consumption',
                dataIndex:'total_consumption',
        });

        const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
            return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value}</text>;
        };
        return <div>
            <h2>Monthly Inventory
                <span style={{float: 'right'}}>
                    <p><small>E-Mail To:&nbsp;</small>
                        <Select onChange={(e) => this.sendMail(e)} style={{width: 200}}>
                            {this.state.mailingUsersList.map(item => <Select.Option
                                value={item.email}>{item.name}</Select.Option>)}
                        </Select>
                    </p>
                </span>
            </h2>
            <Spin size="large" spinning={this.state.loading}>
                {this.state.report.length>0?
                    <ComposedChart width={1000} height={400} data={[...this.state.report].reverse()}
                                   margin={{top: 20, right: 20, bottom: 20, left: 20}}>


                        <XAxis dataKey="date" tickFormatter={(value) => {
                            return moment(value).format('MMM YY')
                        }} />
                        <YAxis label={{ value: 'Quantity Consumed', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        {/*<Legend />*/}
                        <Bar dataKey='consume' barSize={35} fill='#0059b3' stroke="#0059b3" label={renderCustomBarLabel}/>
                    </ComposedChart>:<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data to Show"/>}
            </Spin>

            <CustomizedTable
                loading={this.state.loading}
                columns={columns}
                dataSource={dailyReports}/>
        </div>
    }
}
