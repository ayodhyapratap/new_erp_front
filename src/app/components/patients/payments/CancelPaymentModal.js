import React from "react";
import {Button, Card, Form, Icon, Input, Modal} from "antd";
import {
    CANCELINVOICE_RESENT_OTP,
    CANCELINVOICE_VERIFY_OTP,
    SINGLE_INVOICES_API, SINGLE_PAYMENT_API
} from "../../../constants/api";
import {displayMessage, getAPI, interpolate, postAPI, putAPI} from "../../../utils/common";
import {SUCCESS_MSG_TYPE} from "../../../constants/dataKeys";
class CancelPaymentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelPaymentVisible: this.props.cancelPaymentVisible,
            otpSent:this.props.otpSent,

        };
    }


    handleSubmitCancelPayment = (e) => {
        let that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let reqData = {
                    ...values,
                    practice: this.props.active_practiceId,
                }
                let successFn = function (data) {
                    that.setState({
                        cancelPaymentVisible: false,
                    });
                    that.deletePayment(that.props.patientId, that.props.paymentId);
                    that.props.cancelPaymentClose();
                };
                let errorFn = function () {

                };
                postAPI(CANCELINVOICE_VERIFY_OTP, reqData, successFn, errorFn);
            }
        });
    }



    deletePayment(patient, payment) {
        let that = this;
        let reqData = {patient: patient, is_cancelled: true};
        let successFn = function (data) {
            displayMessage(SUCCESS_MSG_TYPE, "Payment cancelled successfully")
            that.props.loadPayments();
        };
        let errorFn = function () {
        };
        putAPI(interpolate(SINGLE_PAYMENT_API, [payment]), reqData, successFn, errorFn);

    }


    sendOTP() {
        let that = this;
        let successFn = function (data) {

        };
        let errorFn = function () {

        };
        getAPI(CANCELINVOICE_RESENT_OTP, successFn, errorFn);
    }

    render() {
        let that = this;
        const {getFieldDecorator} = that.props.form;
        return(
            <Modal
                visible={(that.state.cancelPaymentVisible && that.props.editPayment && that.props.editPayment.id == that.props.payment.id)}
                title="Cancel Payment"
                footer={null}
                onOk={that.handleSubmitCancelPayment}
                onCancel={that.props.cancelPaymentClose}
            >
                <Form>
                    <Form.Item>
                        {getFieldDecorator('otp', {
                            rules: [{required: true, message: 'Please input Otp!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Otp"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {that.state.otpSent ? <a style={{float: 'right'}} type="primary" onClick={that.sendOTP}>
                            Resend Otp ?
                        </a> : null}
                        <Button size="small" type="primary" htmlType="submit" onClick={that.handleSubmitCancelPayment}>
                            Submit
                        </Button>&nbsp;
                        <Button size="small" onClick={that.props.cancelPaymentClose}>
                            Close
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }


}
export default Form.create()(CancelPaymentModal);