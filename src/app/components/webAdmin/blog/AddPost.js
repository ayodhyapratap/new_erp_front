import {Button, Card, Form, Icon, List, Row} from "antd";
import React from "react";
import {
    DATE_PICKER,
    INPUT_FIELD,
    QUILL_TEXT_FIELD,
    SELECT_FIELD,
    SUCCESS_MSG_TYPE,
    TEXT_FIELD
} from "../../../constants/dataKeys";
import DynamicFieldsForm from "../../common/DynamicFieldsForm";
import {displayMessage, getAPI, interpolate} from "../../../utils/common";
import {BLOG_DISEASE, BLOG_POST, INVOICES_API, PRACTICE, SINGLE_DISEASE, SINGLE_POST} from "../../../constants/api";
import {Route} from "react-router";
import {Redirect} from "react-router-dom";


export default class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBlogData : this.props.editBlogData?this.props.editBlogData:null
        }
    }
    componentDidMount(){
        if(this.props.match.params.id){
            if(this.state.editBlogData) {
                this.loadData();
            }
        }
    }

    loadData(){
        let that =this;
        let successFn = function (data) {
            that.setState({
                editBlogData:data,
            })
        }
        let errorFn = function () {

        }
        getAPI(SINGLE_POST ,successFn, errorFn);

    }


    render(){
        const  fields= [{
            label: "Blog Title",
            key: "title",
            initialValue:this.state.editBlogData?this.state.editBlogData.title:null,
            type: INPUT_FIELD
        },{
            label: "Blog Domain ",
            key: "domain",
            initialValue:this.state.editBlogData?this.state.editBlogData.cost:null,
            type: INPUT_FIELD
        },{
            label: "Blog Image",
            key: "featured_image",
            initialValue:this.state.editBlogData?this.state.editBlogData.discount:null,
            type: INPUT_FIELD,
        },{
            label: "Posted On",
            key: "posted_on",
            initialValue:this.state.editBlogData?this.state.editBlogData.discount:null,
            type: DATE_PICKER,
            format:"YYYY/MM/DD HH:mm"

        },{
            label: "SEO Description",
            key: "meta_description  ",
            initialValue:this.state.editBlogData?this.state.editBlogData.total:null,
            type: INPUT_FIELD,
        },{
            label: "SEO Keywords",
            key: "keywords",
            initialValue:this.state.editBlogData?this.state.editBlogData.total:null,
            type: TEXT_FIELD,
        },{
            label: "Url",
            key: "domain",
            initialValue:this.state.editBlogData?this.state.editBlogData.total:null,
            type: INPUT_FIELD,
        },{
            label: "content",
            key: "content",
            initialValue:this.state.editBlogData?this.state.editBlogData.total:null,
            type: QUILL_TEXT_FIELD,
        }, ];


        let editformProp;
        if(this.state.editBlogData) {
            editformProp = {
                successFn: function (data) {
                    displayMessage(SUCCESS_MSG_TYPE, "success");
                    console.log(data);
                },
                errorFn: function () {

                },
                action: interpolate(SINGLE_POST, [this.props.practiceId]),
                method: "put",

            }
        }
        const TestFormLayout = Form.create()(DynamicFieldsForm);

        const formProp={
            successFn:function(data){
                displayMessage(SUCCESS_MSG_TYPE, "success");

                console.log(data);
            },
            errorFn:function(){

            },
            action:  interpolate(BLOG_POST, [this.props.match.params.id]),
            method: "post",
        }
        let defaultValues=[];

        return <Row>
            <Card>
                <Route exact path='web/bog/edit/:id'
                       render={() => (this.props.match.params.id?<TestFormLayout defaultValues={defaultValues} title="Edit Post" changeRedirect= {this.changeRedirect} formProp= {editformProp} fields={fields}/>: <Redirect to={'web/blog'} />)}/>
                <Route exact path='/web/blog/add'
                       render={() =><TestFormLayout title="Add Post" changeRedirect= {this.changeRedirect} formProp= {formProp} fields={fields}/>}/>


            </Card>
            {this.state.redirect&&    <Redirect to={'web/blog'} />}
        </Row>

    }
}
