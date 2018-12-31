import {Button, Card, Form, Icon, List, Row} from "antd";
import React from "react";
import {
    DATE_PICKER, FILE_UPLOAD_FIELD,
    INPUT_FIELD,
    QUILL_TEXT_FIELD,
    SELECT_FIELD,
    SUCCESS_MSG_TYPE,
    TEXT_FIELD
} from "../../../constants/dataKeys";
import DynamicFieldsForm from "../../common/DynamicFieldsForm";
import {displayMessage, getAPI, interpolate} from "../../../utils/common";
import {
    BLOG_DISEASE,
    BLOG_POST, EXPENSE_TYPE, EXPENSES_API,
    INVOICES_API, PAYMENT_MODES,
    PRACTICE,
    SINGLE_DISEASE, SINGLE_EXPENSES_API,
    SINGLE_PAGE_SEO,
    SINGLE_POST, SINGLE_VENDOR_API, VENDOR_API
} from "../../../constants/api";
import {Route} from "react-router";
import {Redirect} from "react-router-dom";


export default class AddExpenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editData : this.props.editData?this.props.editData:null
        }
    }
    changeRedirect(){
        var redirectVar=this.state.redirect;
        this.setState({
            redirect:  !redirectVar,
        })  ;

    }

    componentDidMount(){
        if(this.props.match.params.id) {
            if (!this.state.editData) {
                this.loadData();
            }
        }
            this.loadExpensetypes();
            this.loadPaymentModes();
            this.loadVendors();


    }
    loadPaymentModes(){
        var that = this;
        let successFn = function (data) {
            console.log("get table");
            that.setState({
                paymentModes:data,
            })
        };
        let errorFn = function () {
        };
        getAPI(interpolate( PAYMENT_MODES, [this.props.active_practiceId]), successFn, errorFn);
    }

    loadData(){
        let that =this;
        let successFn = function (data) {
            that.setState({
                editData:data,
            })
        }
        let errorFn = function () {

        }
        getAPI(interpolate(SINGLE_EXPENSES_API, [this.props.match.params.id]) ,successFn, errorFn);


    }
    loadExpensetypes(){
        var that = this;
        let successFn = function (data) {
            console.log("get table");
            that.setState({
                expense_types:data,
            })
        };
        let errorFn = function () {
        };
        getAPI(interpolate( EXPENSE_TYPE, [this.props.active_practiceId]), successFn, errorFn);
    }
    loadVendors(){
        var that = this;
        let successFn = function (data) {
            console.log("get table");
            that.setState({
                vendors:data,
            })
        };
        let errorFn = function () {
        };
        getAPI(interpolate( VENDOR_API, [this.props.active_practiceId]), successFn, errorFn);
    }



    render(){
        const paymentModesOptions=[]
        if(this.state.paymentModes){
            this.state.paymentModes.forEach(function(drug){
                paymentModesOptions.push({label:(drug.mode), value:drug.id} );
            })
        };
        const expenseTypesOptions=[]
        if(this.state.expense_types){
            this.state.expense_types.forEach(function(drug){
                expenseTypesOptions.push({label:(drug.name), value:drug.id} );
            })
        }
        const vendorsOptions=[]
        if(this.state.vendors){
            this.state.vendors.forEach(function(drug){
                vendorsOptions.push({label:(drug.name), value:drug.id} );
            })
        }
        const  fields= [{
            label: "amount",
            key: "amount",
            initialValue:this.state.editData?this.state.editData.amount:null,
            type: INPUT_FIELD
        },{
            label: "Payment Mode",
            key: "payment_mode",
            type: SELECT_FIELD,
            initialValue:this.state.editData?this.state.editData.paymentModes:null,
            options: paymentModesOptions
        },{
            label: "Vendor",
            key: "vendor",
            type: SELECT_FIELD,
            initialValue:this.state.editData?this.state.editData.vendors:null,
            options: vendorsOptions
        },{
            label: "Expense type",
            key: "expense_type",
            type: SELECT_FIELD,
            initialValue:this.state.editData?this.state.editData.expenses:null,
            options: expenseTypesOptions
        },];


        let editformProp;
        if(this.state.editBlogData) {
            editformProp = {
                successFn: function (data) {
                    displayMessage(SUCCESS_MSG_TYPE, "success");
                    console.log(data);
                },
                errorFn: function () {

                },
                action: interpolate(SINGLE_EXPENSES_API, [this.props.match.params.id]),
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
            action:  EXPENSES_API,
            method: "post",
        }
        const defaultValues = [{"key":"practice", "value":this.props.active_practiceId}];
        return <Row>
            <Card>
                <Route exact path='/inventory/expenses/edit/:id'
                       render={() => (this.props.match.params.id?<TestFormLayout defaultValues={defaultValues} title="Edit Post" changeRedirect= {this.changeRedirect} formProp= {editformProp} fields={fields}/>: <Redirect to={'/inventory/expenses'} />)}/>
                <Route exact path='/inventory/expenses/add'
                       render={() =><TestFormLayout title="Add expenses" changeRedirect= {this.changeRedirect} formProp= {formProp} fields={fields}/>}/>


            </Card>
            {this.state.redirect&&    <Redirect to={'/inventory/expenses'} />}
        </Row>

    }
}