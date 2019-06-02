import React from "react";
import PrintSettings from "../printout/PrintSettings";
import {Card} from 'antd';

export default class MailPDFSettings extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div>
            <h2>Email PDF Settings</h2>
            <Card>
                <PrintSettings sub_type={"INVOICE"}
                               active_practiceId={this.props.active_practiceId} type={"MAIL"}/></Card>
        </div>
    }
}