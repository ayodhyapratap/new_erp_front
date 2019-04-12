import React from "react";
import {Card, Button, Icon, Table, Divider, Popconfirm} from "antd";
import {INPUT_FIELD, QUILL_TEXT_FIELD ,SUCCESS_MSG_TYPE, SINGLE_IMAGE_UPLOAD_FIELD} from "../../../constants/dataKeys";
import {displayMessage, getAPI, interpolate, patchAPI} from "../../../utils/common";
import DynamicFieldsForm from "../../common/DynamicFieldsForm";
import {MANAGE_THERAPY, MANAGE_SINGLE_THERAPY} from "../../../constants/api";
import {Route, Switch} from "react-router";
import {Redirect, Link} from "react-router-dom";
import AddManageTherapy from "./AddManageTherapy"

export default class ManageTherapyList extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			therapyData:null
		};
		this.loadData = this.loadData.bind(this);
		this.deleteObject = this.deleteObject.bind(this);
	}

	componentDidMount() {
        this.loadData();
    }

    loadData() {
        let that = this;
        let successFn = function (data) {
        	console.log("data a",data);
            that.setState({
                therapyData: data,
            })
        }
        let errorFn = function () {

        }
        console.log("product Data",that.state.therapyData);

        getAPI(MANAGE_THERAPY, successFn, errorFn);

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
        patchAPI(interpolate(MANAGE_SINGLE_THERAPY, [record.id]), reqData, successFn, errorFn)
    }

    render() {
        let that = this;
        let coloumns = [{
            title: 'Name',
            dataIndex: 'title',
            key: 'title'
        },{
            title: 'Description',
            render: (item)=> {
                return <div dangerouslySetInnerHTML={{ __html: item.content }}/>
            }
        }, {
            title: 'Actions',
            render: (item) => {
                return <div>
                    <Link to={"/web/managetherapy/edit/" + item.id}>Edit</Link>
                    <Divider type="vertical"/>
                    <Popconfirm title="Are you sure delete this item?"
                                onConfirm={() => that.deleteObject(item)} okText="Yes" cancelText="No">
                        <a>Delete</a>
                    </Popconfirm>
                </div>
            }
        }];
        return <div>
        	<Switch>
	        	<Route exact path='/web/managetherapy/edit/:id'
        				render={(route) => <AddManageTherapy loadData={this.loadData} {...this.state} {...route}/>}/>
	        	<Route exact path='/web/managetherapy/add'
	                   render={(route) => <AddManageTherapy loadData={this.loadData} {...this.state} {...route}/>}/>
	            <Card title="Therapy" extra={<Link to={"/web/managetherapy/add"}> <Button type="primary"><Icon
	                type="plus"/> Add</Button></Link>}>
	                <Table dataSource={this.state.therapyData} columns={coloumns}/>
	            </Card>
	        </Switch>
        </div>
    }
}