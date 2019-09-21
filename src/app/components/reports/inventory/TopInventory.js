import React from "react";
import {Empty, Spin} from "antd"
import {INVENTORY_REPORT_API,} from "../../../constants/api";
import {getAPI} from "../../../utils/common";
import {LineChart, Line, XAxis, YAxis,Bar, CartesianGrid, Tooltip, Label, Legend, ComposedChart} from 'recharts';
import CustomizedTable from "../../common/CustomizedTable";
import {TYPE_OF_CONSUMPTION} from "../../../constants/hardData";

export default class TopInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportItem_wise: [],
            reportTotal:[],
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            loading: true,

        }
        this.loadDailyInventory = this.loadDailyInventory.bind(this);
    }
    componentDidMount() {
        this.loadDailyInventory();
    }

    componentWillReceiveProps(newProps) {
        let that = this;
        if (this.props.startDate != newProps.startDate || this.props.endDate != newProps.endDate ||this.props.product_item!=newProps.product_item ||this.props.consume!=newProps.consume)
            this.setState({
                startDate: newProps.startDate,
                endDate: newProps.endDate
            }, function () {
                that.loadDailyInventory();
            })
    }

    loadDailyInventory() {
        let that = this;
        that.setState({
            loading: true
        })
        let successFn = function (data) {
            that.setState({
                report:data,
                reportItem_wise: data.item_wise,
                reportTotal:data.total,
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
    render() {
        let that=this;

        let currentData=that.state.reportItem_wise;
        let topReports=[];
        let itemName={};
        let j=0;
        for (i = 0; i < currentData.length; i++) {
            if(currentData[i]["inventory_item__name"] in itemName){
                itemName[currentData[i]["inventory_item__name"]][currentData[i]["type_of_consumption"]] = currentData[i]["consume"];
            }else{
                itemName[currentData[i]["inventory_item__name"]] = {"SALES": 0,"SERVICES": 0,"DAMAGED": 0,"RETURNED": 0,"ADJUSTMENT": 0};
                itemName[currentData[i]["inventory_item__name"]][currentData[i]["type_of_consumption"]] = currentData[i]["consume"];
            }
        }

        for(let key in itemName){
            let inner = {"item_name":key,"type": itemName[key],"total_consumption": 0}
            let total = itemName[key]["SALES"] + itemName[key]["SERVICES"] + itemName[key]["DAMAGED"] + itemName[key]["RETURNED"] + itemName[key]["ADJUSTMENT"];
            inner["total_consumption"] = total;
            topReports.push(inner);
        }

        let i = 1;
        let columns = [{
            title: 'S. No',
            key: 'sno',
            render: (item, record) => <span> {i++}</span>,
            export: (item, record, index) => index + 1,
            width: 50
        },{
            title:'Item Name',
            key:'inventory_item__name',
            dataIndex:'item_name',
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
            <h2>Top Inventory</h2>
            <Spin size="large" spinning={this.state.loading}>
                {this.state.reportTotal.length>0?
                    <ComposedChart width={1000} height={400} data={this.state.reportTotal}
                                   margin={{top: 20, right: 20, bottom: 20, left: 20}}>


                        <XAxis dataKey="inventory_item__name" />
                        <YAxis label={{ value: 'Top Quantity Consumed', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        {/*<Legend />*/}
                        <Bar dataKey='consume' barSize={35} fill='#0059b3' stroke="#0059b3" label={renderCustomBarLabel}/>
                    </ComposedChart>
                :<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data to Show"/>}
            </Spin>

            <CustomizedTable
                loading={this.state.loading}
                columns={columns}
                dataSource={topReports}/>
        </div>
    }
}
