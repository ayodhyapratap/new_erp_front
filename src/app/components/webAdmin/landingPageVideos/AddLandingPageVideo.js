import {Card, Form, Row} from "antd";
import React from "react";
import {
    INPUT_FIELD, NUMBER_FIELD,
    SUCCESS_MSG_TYPE,
} from "../../../constants/dataKeys";
import DynamicFieldsForm from "../../common/DynamicFieldsForm";
import {displayMessage, getAPI, interpolate} from "../../../utils/common";
import {
    LANDING_PAGE_VIDEO,
    SINGLE_LANDING_PAGE_VIDEO,
} from "../../../constants/api";
import {Route} from "react-router";
import {Redirect} from "react-router-dom";


export default class AddLandingPageVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBlogData: this.props.editBlogData ? this.props.editBlogData : null
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            if (!this.state.editBlogData) {
                this.loadData();
            }
        }
    }

    changeRedirect() {
        var redirectVar = this.state.redirect;
        this.setState({
            redirect: !redirectVar,
        });
    }

    loadData() {
        let that = this;
        let successFn = function (data) {
            that.setState({
                editBlogData: data,
            })
        }
        let errorFn = function () {

        }
        getAPI(interpolate(SINGLE_LANDING_PAGE_VIDEO, [this.props.match.params.id]), successFn, errorFn);


    }


    render() {
        let that = this;
        const fields = [{
            label: "Name",
            key: "name",
            initialValue: this.state.editBlogData ? this.state.editBlogData.name : null,
            type: INPUT_FIELD
        }, {
            label: "Rank ",
            key: "rank",
            initialValue: this.state.editBlogData ? this.state.editBlogData.rank : null,
            type: NUMBER_FIELD
        }, {
            label: "Video link",
            key: "link",
            initialValue: this.state.editBlogData ? this.state.editBlogData.link : null,
            type: INPUT_FIELD,
        }];


        let editformProp;
        if (this.state.editBlogData) {
            editformProp = {
                successFn: function (data) {
                    displayMessage(SUCCESS_MSG_TYPE, "success");
                    that.props.loadData();
                    that.changeRedirect();
                    if (that.props.history){
                        that.props.history.replace('/web/landingpagevideo');
                    };
                },
                errorFn: function () {

                },
                action: interpolate(SINGLE_LANDING_PAGE_VIDEO, [this.props.match.params.id]),
                method: "put",

            }
        }
        const TestFormLayout = Form.create()(DynamicFieldsForm);

        const formProp = {
            successFn: function (data) {
                displayMessage(SUCCESS_MSG_TYPE, "success");
                that.props.loadData();
                that.changeRedirect();
                if (that.props.history){
                    that.props.history.replace('/web/landingpagevideo');
                };
            }
            ,
            errorFn: function () {

            },
            action: LANDING_PAGE_VIDEO,
            method: "post",
        }
        let defaultValues = [{"is_active": true}];

        return <Row>
            <Card>
                <Route exact path='/web/landingpagevideo/edit/:id'
                       render={() => (this.props.match.params.id ?
                           <TestFormLayout defaultValues={defaultValues} title="Edit Video"
                                           changeRedirect={this.changeRedirect} formProp={editformProp}
                                           fields={fields}/> : <Redirect to={'/web/landingpagevideo'}/>)}/>
                <Route exact path='/web/landingpagevideo/add'
                       render={() => <TestFormLayout title="Add video" defaultValues={defaultValues}
                                                     changeRedirect={this.changeRedirect} formProp={formProp}
                                                     fields={fields}/>}/>


            </Card>
            {this.state.redirect && <Redirect to={'/web/landingpagevideo'}/>}
        </Row>

    }
}
