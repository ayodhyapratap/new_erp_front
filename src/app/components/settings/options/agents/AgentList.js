import React from "react";
import {Button, Modal, Card, Form, Icon, Row, Table, Divider, Popconfirm, Tag, Select, Col} from "antd";
import {Link, Route, Switch} from "react-router-dom";
import moment from "moment";
import {
    SUCCESS_MSG_TYPE,
    INPUT_FIELD, WARNING_MSG_TYPE, NUMBER_FIELD, DATE_PICKER,
} from "../../../../constants/dataKeys";
import {AGENT_ROLES, ALL_PRACTICE, PATIENT_PROFILE, PATIENTS_LIST, WALLET_LEDGER} from "../../../../constants/api"
import {getAPI, displayMessage, interpolate, postAPI, putAPI, makeFileURL} from "../../../../utils/common";
import AddOrEditAgent from "./AddOrEditAgent";
import CustomizedTable from "../../../common/CustomizedTable";
import InfiniteFeedLoaderButton from "../../../common/InfiniteFeedLoaderButton";
import PatientWalletLedger from "../../../patients/wallet-ledger/PatientWalletLedger";
import DynamicFieldsForm from "../../../common/DynamicFieldsForm";

// import Col from "antd/es/grid/col";

class AgentRoles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            visible: false,
            data: null,
            loading: true,
            agentRoles: [],
            practiceList: [],
            approved: null,
            showAgentData: null
        };
        this.loadData = this.loadData.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.loadAgentRoles = this.loadAgentRoles.bind(this);
    }

    componentDidMount() {
        this.loadData();
        this.loadAgentRoles();
    }

    loadAgentRoles() {
        const that = this;
        const successFn = function (data) {
            that.setState({
                agentRoles: data,
            })
        };
        const errorFn = function () {
        };
        getAPI(AGENT_ROLES, successFn, errorFn);

    }

    loadData(page = 1) {
        const that = this;
        this.setState({
            loading: true
        })
        const successFn = function (data) {
            if (data.current == 1) {
                that.setState({
                    data: data.results,
                    total: data.count,
                    nextPage: data.next,
                    loading: false
                })
            } else {
                that.setState(function (prevState) {
                    return {
                        data: [...prevState.data, ...data.results],
                        total: data.count,
                        nextPage: data.next,
                        loading: false
                    }
                })
            }
        };
        const errorFn = function () {
            that.setState({
                loading: false
            })
        };
        const apiParams = {
            agent: true,
            page
        }
        if (that.state.role)
            apiParams.role = that.state.role;
        if (that.state.approved != null) {
            apiParams.approved = !!that.state.approved;
        }
        apiParams.practice = this.props.active_practiceId;

        getAPI(PATIENTS_LIST, successFn, errorFn, apiParams);
    }

    changeRedirect() {
        const redirectVar = this.state.redirect;
        this.setState({
            redirect: !redirectVar,
        });
    }

    handleCancel = () => {
        this.setState({visible: false});
    }

    editObject(record) {
        this.setState({
            editAgentData: record,
            loading: false
        });

        this.props.history.push(`/settings/agents/${  record.id  }/edit`)

    }

    showWallet = (record) => {
        this.setState({
            showAgentData: record,
        });
    }

    payAgentModal = (record) => {
        this.setState({
            payAgentData: record,
        });
    }

    deleteObject(record) {
        const that = this;
        const reqData = {'id': record.id, is_agent: false}
        const successFn = function (data) {
            that.setState({
                loading: false,
            })
            that.loadData();
        }
        const errorFn = function () {
        };
        putAPI(interpolate(PATIENT_PROFILE, [record.id]), reqData, successFn, errorFn)
    }

    approveAgent = (record) => {
        const that = this;

        const reqData = {'id': record.id, is_approved: true};
        const successFn = function (data) {
            displayMessage(SUCCESS_MSG_TYPE, "Agent Approved Successfully!");
            that.setState(function (prevState) {
                const agentList = [];
                prevState.data.forEach(function (agent) {
                    if (agent.id == record.id) {
                        agent.is_approved = true
                    }
                    agentList.push(agent);
                });
                return {
                    data: agentList,
                    approvalLoading: false
                }
            })
        }
        const errorFn = function () {
            that.setState({
                approvalLoading: false
            })
        };
        if (record.role) {
            that.setState({
                approvalLoading: true
            })
            putAPI(interpolate(PATIENT_PROFILE, [record.id]), reqData, successFn, errorFn)
        } else {
            displayMessage(WARNING_MSG_TYPE, "Kindly assign the role before approving!")
        }
    }

    // handleChange=(key,value)=>{
    //     console.log("type",key,value)
    //     this.props.form.setFieldsValue({
    //         [key]: value,
    //     });
    // }
    handleSubmit = (e) => {
        const that = this;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                that.setState({
                    role: values.role,
                    approved: values.approved,
                }, function () {
                    that.loadData();
                })
            }
        })
    }


    render() {
        const that = this;
        let i = 1;
        const {getFieldDecorator} = this.props.form;
        const columns = [{
            title: 'S. No',
            key: 'sno',
            dataIndex: 'sno',
            render: (item, record) => <span> {i++}</span>,
            export: (item, record, index) => index + 1,
        }, {
            title: 'Name',
            dataIndex: 'user.first_name',
            key: 'name',
            render: (value, record) => <Link to={`/patient/${  record.id  }/profile`}>{value}</Link>,
            export: (item, record) => (record.user.first_name),
        }, {
            title: 'Email',
            dataIndex: 'user.email',
            key: 'email',
            export: (item, record) => (record.user.email),
        }, {
            title: 'Mobile',
            dataIndex: 'user.mobile',
            key: 'mobile',
            export: (item, record) => (record.user.mobile),
        }, {
            title: 'Referrer',
            dataIndex: 'user.referer_data.referer.first_name',
            key: 'referrer',
            render: (value, record) => (value && record.user.referer_data.patient ?
                <Link to={`/patient/${  record.user.referer_data.patient  }/profile`}>{value}</Link> : '--'),
            export: (item, record) => (record.user.referer ? record.user.referer_data.referer.first_name : '--'),
        }, {
            title: 'Role',
            dataIndex: 'role_data.name',
            key: 'role_data',
            export: (item, record) => (record.role_data.name),
        }, {
            title: 'Aadhar',
            dataIndex: 'aadhar_id',
            key: 'aadhar_id',
            export: (value) => (value),
        }, {
            title: 'Document',
            dataIndex: 'aadhar_upload',
            key: 'aadhar_upload',
            hideExport: true,
            render: (value) => (value ? <a target="_blank" href={makeFileURL(value)}>Open Document</a> : '--')
        }, {
            title: 'Status',
            dataIndex: 'is_approved',
            key: 'is_approved',
            render: (value, record) => (
                value ? <Tag color="#87d068">Approved</Tag> : (
<Popconfirm
  title="Are you sure approve this Advisor?"
  onConfirm={() => that.approveAgent(record)}
  okText="Yes"
  cancelText="No"
>
                    <a href="#" disabled={that.state.approvalLoading}>Approve</a>
</Popconfirm>
)
            )
        }, {
            title: 'Action',
            key: 'action',
            hideExport: true,
            render: (text, record) => (
                <span>
                     <a onClick={() => this.showWallet(record)}>  Wallet</a>
                    <Divider type="vertical" />
              <a onClick={() => this.payAgentModal(record)}>  Pay Out</a>
                    <Divider type="vertical" />
              <a onClick={() => this.editObject(record)}>  Edit</a>
                <Divider type="vertical" />
                    <Popconfirm
                      title="Are you sure delete this item?"
                      onConfirm={() => that.deleteObject(record)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a>Delete</a>
                    </Popconfirm>
                </span>
            ),
        }];
        const status = [
            {label: 'Approved', value: true},
            {label: 'Pending', value: false},
            {label: 'All', value: null}
        ];
        const PayAgentForm = Form.create()(DynamicFieldsForm);
        return (
<Switch>
            <Route
              exact
              path="/settings/agents/add"
              render={(route) => (
<AddOrEditAgent
  {...this.props}
  title="Create Advisor"
  loadData={this.loadData}
/>
)}
            />

            <Route
              exact
              path="/settings/agents/:id/edit"
              render={(route) => (
<AddOrEditAgent
  {...this.props}
  {...this.state}
  title="Edit Advisor"
  loadData={this.loadData}
/>
)}
            />
            <Route>
                <Card title={(
<h4>Advisor <Link to="/settings/agents/add">
                    <Button style={{float: 'right'}} type="primary"><Icon type="plus" />
                        Add
                    </Button>
            </Link>
</h4>
)}
                >
                    <Row>
                        <Col style={{float: "right"}}>
                            <Form layout="inline" onSubmit={this.handleSubmit}>
                                <Form.Item key="role" label="Advisor Role">
                                    {getFieldDecorator("role", {initialValue: this.state.agentRoles ? this.state.agentRoles.id : ''},
                                    )(
                                        <Select placeholder="Advisor Role" style={{minWidth: 150}} allowClear>
                                            {this.state.agentRoles.map((option) => (
<Select.Option
  value={option.id}
>{option.name}
</Select.Option>
))}
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item key="approved" label="Status">
                                    {getFieldDecorator("approved", {initialValue: this.state.approved ? this.state.approved : null},
                                    )(
                                        <Select placeholder="status" style={{minWidth: 150}}>
                                            {status.map(item => (
<Select.Option
  value={item.value}
>
                                                {item.label}
</Select.Option>
))}
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{margin: 5}}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>

                    <CustomizedTable
                      loading={this.state.loading}
                      columns={columns}
                      dataSource={this.state.data}
                      pagination={false}
                    />
                    <InfiniteFeedLoaderButton
                      loading={this.state.loading}
                      loaderFunction={() => that.loadData(that.state.nextPage)}
                      hidden={!this.state.nextPage}
                    />
                    <Modal
                      visible={this.state.showAgentData}
                      closable={false}
                      centered
                      width={1000}
                      footer={null}
                      style={{top: 60}}
                    >
                        <Button
                          type="primary"
                          style={{position: 'absolute', top: '-50px'}}
                          onClick={() => this.payAgentModal(this.state.showAgentData)}
                        >Pay Out
                        </Button>
                        <Button
                          icon="close"
                          type="danger"
                          shape="circle"
                          style={{position: 'absolute', top: '-50px', right: 0}}
                          onClick={() => this.showWallet(null)}
                        />
                        {this.state.showAgentData ? (
                            <PatientWalletLedger
                              currentPatient={this.state.showAgentData}
                              key={this.state.showAgentData ? this.state.showAgentData.id + this.state.payAgentData : null}
                            />
                          ) : null}
                    </Modal>
                    <Modal
                      visible={this.state.payAgentData}
                      closable={false}
                      centered
                      footer={null}
                      closeIcon={null}
                      style={{top: 60}}
                    >
                        <Button
                          icon="close"
                          type="danger"
                          shape="circle"
                          style={{position: 'absolute', top: '-50px', right: 0}}
                          onClick={() => this.payAgentModal(null)}
                        />
                        {this.state.payAgentData ? (
<div>
                            <h2>Pay {this.state.payAgentData.user.first_name}</h2>
                            <PayAgentForm
                              formProp={{
                                method: 'post',
                                action: WALLET_LEDGER,
                                successFn () {
                                    that.payAgentModal(null)
                                },
                                errorFn () {

                                },
                                confirm: true,
                                confirmText: "Are you sure to pay out this advisor?"
                            }}
                              fields={[{
                                              label: 'Amount',
                                              key: 'amount',
                                              type: NUMBER_FIELD,
                                              required: true,
                                              follow: 'INR'
                                          }, {
                                              label: 'Date',
                                              key: 'date',
                                              type: DATE_PICKER,
                                              required: true,
                                              format: 'YYYY-MM-DD',
                                              initialValue: moment()
                                          }, {
                                              label: 'Comments',
                                              key: 'comments',
                                              type: INPUT_FIELD,
                                              required: true,
                                              extra: 'Comments for this transaction'
                                          }]}
                              defaultValues={[{
                                key: 'ledger_type',
                                value: 'Payout',
                            }, {
                                key: 'amount_type',
                                value: 'Non Refundable',
                            }, {
                                key: 'practice',
                                value: this.props.active_practiceId
                            }, {
                                key: 'is_mlm',
                                value: false
                            }, {
                                key: 'is_cancelled',
                                value: false
                            }, {
                                key: 'patient',
                                value: this.state.payAgentData.id
                            }, {
                                key: 'staff',
                                value: this.props.user.id
                            }]}
                            />
</div>
) : null}
                    </Modal>
                </Card>
            </Route>

</Switch>
)


    }
}

export default Form.create()(AgentRoles);
