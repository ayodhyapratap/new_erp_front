import {Button, Card, Divider, Icon, Popconfirm, Table} from "antd";
import React from "react";
import {getAPI, interpolate, patchAPI} from "../../../utils/common";
import {BLOG_DISEASE, SINGLE_DISEASE} from "../../../constants/api";
import {Route, Switch} from "react-router";
import AddDisease from "./AddDisease";
import {Link} from "react-router-dom";
import InfiniteFeedLoaderButton from "../../common/InfiniteFeedLoaderButton";

export default class DiseaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disease: [],
            loading:true
        };
        this.loadDiseases = this.loadDiseases.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
    }

    componentDidMount() {
        this.loadDiseases();
    }

    loadDiseases =(page=1)=> {
        let that = this;
        let successFn = function (data) {
            that.setState(function (prevState) {
                if (data.current == 1){
                    return{
                        disease:[...data.results],
                        next:data.next,
                        loading:false,
                    }
                }
                return {
                    disease:[...prevState.disease, ...data.results],
                    next:data.next,
                    loading:false,
                }
            })
        };
        let errorFn = function () {
            that.setState({
                loading:false
            })

        };
        let apiParams={
            page:page,
        };

        getAPI(BLOG_DISEASE, successFn, errorFn, apiParams);
    };

    deleteObject(record) {
        let that = this;
        let reqData = {};
        reqData.is_active = false;
        let successFn = function (data) {
            that.loadDiseases();
        };
        let errorFn = function () {
        };
        patchAPI(interpolate(SINGLE_DISEASE, [record.id]), reqData, successFn, errorFn)
    }

    render() {
        let that = this;
        let columns = [{
            title: 'Disease Name',
            dataIndex: 'disease_name',
            key: 'disease_name'
        }, {
            title: 'Disease Type',
            dataIndex: 'disease_type',
            key: 'disease_type'
        }, {
            title: 'Actions',
            render: (item) => {
                return <div>
                    <Link to={"/web/disease/edit/" + item.id}>Edit</Link>
                    <Divider type="vertical"/>
                    <Popconfirm title="Are you sure delete this item?"
                                onConfirm={() => that.deleteObject(item)} okText="Yes" cancelText="No">
                        <a>Delete</a>
                    </Popconfirm>
                </div>
            }
        }];
        return <div><Switch>
            <Route exact path='/web/disease/add'
                   render={(route) => <AddDisease{...this.state} {...route} loadData={this.loadDiseases}/>}/>
            <Route exact path='/web/disease/edit/:id'
                   render={(route) => <AddDisease{...this.state} {...route} loadData={this.loadDiseases}/>}/>
            <Card title="Disease"
                  extra={<Link to={"/web/disease/add"}> <Button type="primary"><Icon type="plus"/> Add</Button></Link>}>
                <Table loading={this.state.loading} pagination={false} columns={columns} dataSource={this.state.disease}/>

                <InfiniteFeedLoaderButton loaderFunction={()=>this.loadDiseases(this.state.next)}
                                          loading={this.state.loading}
                                          hidden={!this.state.next}/>
            </Card>
        </Switch>
        </div>
    }
}
