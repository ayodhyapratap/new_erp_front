import {Button, Card, Divider, Icon, Popconfirm, Table} from "antd";
import React from "react";
import {getAPI, interpolate, patchAPI} from "../../../utils/common";
import {
    BLOG_FACILITY, SINGLE_FACILITY,
} from "../../../constants/api";
import {Route, Switch} from "react-router";
import AddFacility from "./AddFacility";
import {Link} from "react-router-dom";

export default class FacilityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facility: null,
            loading:true
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        let that = this;
        let successFn = function (data) {
            that.setState({
                facility: data,
                loading:false
            })
        }
        let errorFn = function () {
            that.setState({
                loading:false
            })

        }
        getAPI(BLOG_FACILITY, successFn, errorFn);
    }

    deleteObject(record) {
        let that = this;
        let reqData = {};
        reqData.is_active = false;
        let successFn = function (data) {
            that.loadData();
        };
        let errorFn = function () {
        };
        patchAPI(interpolate(SINGLE_FACILITY, [record.id]), reqData, successFn, errorFn)
    }

    render() {
        let that = this;
        let coloumns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Actions',
            render: (item) => {
                return <div>
                    <Link to={"/web/facilities/edit/" + item.id}>Edit</Link>
                    <Divider type="vertical"/>
                    <Popconfirm title="Are you sure delete this item?"
                                onConfirm={() => that.deleteObject(item)} okText="Yes" cancelText="No">
                        <a>Delete</a>
                    </Popconfirm>
                </div>
            }
        }];
        return <div><Switch>
            <Route exact path='/web/facilities/add'
                   render={(route) => <AddFacility loadData={this.loadData} {...this.state} {...route}/>}/>
            <Route exact path='/web/facilities/edit/:id'
                   render={(route) => <AddFacility loadData={this.loadData} {...this.state} {...route}/>}/>
            <Card title="Facilities" extra={<Link to={"/web/facilities/add"}> <Button type="primary"><Icon
                type="plus"/> Add</Button></Link>}>
                <Table loading={this.state.loading} dataSource={this.state.facility} columns={coloumns}/>
            </Card>
        </Switch>
        </div>
    }
}
