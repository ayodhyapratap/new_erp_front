import {Button, Card, Form, Icon, List, Row, Upload} from "antd";
import React from "react";
import {
    DATE_PICKER,
    INPUT_FIELD, NUMBER_FIELD,
    QUILL_TEXT_FIELD,
    SELECT_FIELD, SINGLE_CHECKBOX_FIELD,
    SUCCESS_MSG_TYPE,
    TEXT_FIELD
} from "../../../constants/dataKeys";
import DynamicFieldsForm from "../../common/DynamicFieldsForm";
import {displayMessage, getAPI, interpolate} from "../../../utils/common";
import {
    BLOG_DISEASE,
    BLOG_POST, BLOG_VIDEOS,
    INVOICES_API,
    PRACTICE,
    SINGLE_DISEASE, SINGLE_PAGE_SEO,
    SINGLE_POST,
    SINGLE_VIDEO
} from "../../../constants/api";
import {Route} from "react-router";
import {Redirect} from "react-router-dom";


export default class AddVideo extends React.Component {
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
        getAPI(interpolate(SINGLE_VIDEO, [this.props.match.params.id]), successFn, errorFn);


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
            key: "contact_rank",
            initialValue: this.state.editBlogData ? this.state.editBlogData.contact_rank : 1,
            type: NUMBER_FIELD,
            required:true,
            min:1
        }, {
            label: "Video link",
            key: "link",
            initialValue: this.state.editBlogData ? this.state.editBlogData.link : null,
            type: INPUT_FIELD,
            required:true
        },
        //     {
        //     label: "Active",
        //     key: "is_active",
        //     initialValue: this.state.editBlogData ? this.state.editBlogData.is_active : null,
        //     type: SINGLE_CHECKBOX_FIELD,
        // },
        ];


        let editformProp;
        if (this.state.editBlogData) {
            editformProp = {
                successFn: function (data) {
                    displayMessage(SUCCESS_MSG_TYPE, "success");
                    that.setState({
                        redirect: true
                    });
                    that.props.loadData();
                },
                errorFn: function () {

                },
                action: interpolate(SINGLE_VIDEO, [this.props.match.params.id]),
                method: "put",

            }
        }
        const TestFormLayout = Form.create()(DynamicFieldsForm);

        const formProp = {
            successFn: function (data) {
                displayMessage(SUCCESS_MSG_TYPE, "success");
                that.setState({
                    redirect: true
                });
                that.props.loadData();
                console.log(data);
            },
            errorFn: function () {

            },
            action: BLOG_VIDEOS,
            method: "post",
        }
        let defaultValues = [{key:'is_active',value:true}];

        return <Row>
            <Card>
                <Route exact path='/web/videos/edit/:id'
                       render={() => (this.props.match.params.id ?
                           <TestFormLayout defaultValues={defaultValues} title="Edit Video"
                                           changeRedirect={this.changeRedirect} formProp={editformProp}
                                           fields={fields}/> : <Redirect to={'/web/videos'}/>)}/>
                <Route exact path='/web/videos/add'
                       render={() => <TestFormLayout title="Add video" defaultValues={defaultValues} changeRedirect={this.changeRedirect}
                                                     formProp={formProp} fields={fields}/>}/>


            </Card>

            {this.state.redirect && <Redirect to={'/web/videos'}/>}
        </Row>

    }
}
