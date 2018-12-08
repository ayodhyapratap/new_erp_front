import React from "react";
import DynamicFieldsForm from "../../../common/DynamicFieldsForm";
import {Button, Card,Divider, Form, Icon, Row, Table} from "antd";
import {CHECKBOX_FIELD, INPUT_FIELD, RADIO_FIELD, SELECT_FIELD} from "../../../../constants/dataKeys";
import {Link} from "react-router-dom";
import {ALL_PRACTICE, OFFERS} from "../../../../constants/api";
import {getAPI, deleteAPI, interpolate} from "../../../../utils/common";

class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          offers: null
        }
    }
    componentDidMount() {
      var that = this;
        let successFn = function (data) {
          console.log("get table");
          that.setState({
            offers:data,
          })
        };
        let errorFn = function () {
        };
        getAPI(interpolate( OFFERS, [this.props.active_practiceId]), successFn, errorFn);
      }
    render() {
      const columns = [{
            title: 'Name',
            dataIndex: 'code',
            key: 'code',
          }, {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
          },{
            title:' discount',
            dataIndex:'discount',
            key:'discount',
          },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                Edit
                <Divider type="vertical" />
                delete
              </span>
            ),
          }];
        return <Row>
            <h2>All Offers
                <Link to="/settings/loyalty/add">
                    <Button type="primary" style={{float: 'right'}}>
                        <Icon type="plus"/>&nbsp;Add
                    </Button>
                </Link>
            </h2>
            <Card>
                <Table columns={columns} dataSource={this.state.offers}>

                </Table>
            </Card>
        </Row>
    }
}

export default Offers;