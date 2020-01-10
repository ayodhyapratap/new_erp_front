import {Button, Card, Divider, Icon, Popconfirm, Table,} from "antd";
import React from "react";
import {getAPI, interpolate, patchAPI} from "../../../utils/common";
import {BLOG_POST, SINGLE_POST} from "../../../constants/api";
import {Route, Switch} from "react-router";
import AddPost from "./AddPost";
import {Link} from "react-router-dom";
import moment from "moment";
import InfiniteFeedLoaderButton from "../../common/InfiniteFeedLoaderButton";

export default class DiseaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            loading:true
        };
        this.loadData = this.loadData.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = (page = 1 )=> {
        let that = this;
        let successFn = function (data) {
            that.setState(function (prevState) {
                if (data.current ==1){
                    return{
                        post:[...data.results],
                        next:data.next,
                        loading:false,
                    }
                }
                return {
                    post:[...prevState.post, ...data.results],
                    next: data.next,
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
        }
        getAPI(BLOG_POST, successFn, errorFn, apiParams);
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
        patchAPI(interpolate(SINGLE_POST, [record.id]), reqData, successFn, errorFn)
    }

    render() {
        let that = this;
        let columns = [{
            title: 'Blog Title',
            dataIndex: 'title',
            key: 'post_title'
        }, {
            title: 'Date',
            dataIndex: 'posted_on',
            key: 'post_date',
            export: function (text) {
                return moment(text).format('lll');
            },
            render:(value ,record)=><span>{record.posted_on?<span>{moment(record.posted_on).format("lll")}</span>:null}</span>

        }, {
            title: 'Actions',
            render: (item) => {
                return <div>
                    <Link to={"/web/blog/edit/" + item.id}>Edit</Link>
                    <Divider type="vertical"/>
                    <Popconfirm title="Are you sure delete this item?"
                                onConfirm={() => that.deleteObject(item)} okText="Yes" cancelText="No">
                        <a>Delete</a>
                    </Popconfirm>
                </div>
            }
        }];
        return <div><Switch>
            <Route exact path='/web/blog/add'
                   render={(route) => <AddPost {...this.state} {...route} loadData={this.loadData}/>}/>
            <Route exact path='/web/blog/edit/:id'
                   render={(route) => <AddPost {...this.state} {...route} loadData={this.loadData}/>}/>
            <Card title="Blogs"
                  extra={<Link to={"/web/blog/add"}> <Button type="primary"><Icon type="plus"/> Add</Button></Link>}>
                <Table loading={this.state.loading} dataSource={this.state.post} pagination={false} columns={columns}/>

                <InfiniteFeedLoaderButton loaderFunction={()=>this.loadData(this.state.next)}
                                          loading={this.state.loading}
                                          hidden={!this.state.next}/>
            </Card>
        </Switch>
        </div>
    }
}
