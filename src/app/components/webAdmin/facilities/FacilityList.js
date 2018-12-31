import {Button, Card, Icon, List, Table} from "antd";
import React from "react";
import {getAPI} from "../../../utils/common";
import {BLOG_FACILITY, BLOG_PAGE_SEO, BLOG_POST, BLOG_SLIDER} from "../../../constants/api";
import {Route, Switch} from "react-router";
import AddFacility from "./AddFacility";
import {Link} from "react-router-dom";

export default class FacilityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facility: null
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
                facility: data
            })
        }
        let errorFn = function () {

        }
        getAPI(BLOG_FACILITY, successFn, errorFn);
    }

    render() {
        let coloumns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Actions',
            render: (item) => {
                return <div>
                    <Link to={"/web/facilities/edit/" + item.id}>Edit</Link>
                </div>
            }
        }];
        return <div><Switch>
            <Route exact path='/web/facilities/add'
                   render={(route) => <AddFacility {...this.state} {...route}/>}/>
            <Route exact path='/web/facilities/edit/:id'
                   render={(route) => <AddFacility {...this.state} {...route}/>}/>
            <Card title="Facilities" extra={<Link to={"/web/facilities/add"}> <Button type="primary"><Icon
                type="plus"/> Add</Button></Link>}>
                <Table dataSource={this.state.facility} columns={coloumns}/>
            </Card>
        </Switch>
        </div>
    }
}