import React from "react";
import {Button, Card, Col, Icon, Radio, Row, Table} from "antd";

export default class IncomeReport extends React.Component {
    render() {
        return <div>
            <h2>Income Report
                <Button.Group style={{float: 'right'}}>
                    <Button><Icon type="mail"/> Mail</Button>
                    <Button><Icon type="printer"/> Print</Button>
                </Button.Group>
            </h2>
            <Card>
                <Row gutter={16}>
                    <Col span={16}>
                        <Table dataSource={[]}/>
                    </Col>
                    <Col span={8}>
                        <Radio.Group buttonStyle="solid" defaultValue="all">
                            <h2>Patients</h2>
                            <Radio.Button style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value="all">
                                All Invoices
                            </Radio.Button>
                            <p><br/></p>
                            <h2>Related Reports</h2>
                            <Radio.Button style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value="b">
                                Daily Invoiced Income
                            </Radio.Button>
                            <Radio.Button style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value="c">
                                Monthly Invoiced Income
                            </Radio.Button>
                            <Radio.Button style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value="d">
                                Taxed Invoiced Income
                            </Radio.Button>
                            <Radio.Button style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value="e">
                                Invoiced Income For Each Doctor
                            </Radio.Button>
                            <Radio.Button style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value="f">
                                Invoiced Income For Each Procedure
                            </Radio.Button>
                            <Radio.Button style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value="g">
                                Invoiced Income For Each Patient Group
                            </Radio.Button>
                            <Radio.Button style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value="h">
                                Invoiced Income For Each Product
                            </Radio.Button>
                            {/*<p><b>My Groups</b></p>*/}
                            {/*{this.state.patientGroup.map((group) => <Radio.Button*/}
                                {/*style={{width: '100%', backgroundColor: 'transparent', border: '0px'}} value={group.id}>*/}
                                {/*{group.name}*/}
                            {/*</Radio.Button>)}*/}

                            {/*<p><br/></p>*/}
                            {/*<p><b>Membership</b></p>*/}
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>
        </div>
    }
}