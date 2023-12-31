import React from "react";
import {Layout} from "antd";
import {Route, Switch} from "react-router-dom";
import VendorList from "./vendor/VendorList";
import ExpensesList from "./expenses/ExpensesList";
import ManufactureList from "./manufacture/ManufactureList";
import LabList from "./labs/LabList";
import ActivityList from "./activities/ActivityList";
import InventoryItemList from "./inventoryItem/InventoryItemList";
import PermissionDenied from "../common/errors/PermissionDenied";

const {Content} = Layout;
export default class InventoryHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const that =this;
        return (
<Content
  className="main-container"
  style={{
            margin: '24px 16px',
            // padding: 24,
            minHeight: 280,
            // marginLeft: '200px'
        }}
>

            <Switch>
                <Route
                  path="/inventory/vendor"
                  render={(route) =>(that.props.activePracticePermissions.ViewVendor || that.props.allowAllPermissions?
                    <VendorList {...this.props} {...route} />:<PermissionDenied />)}
                />
                    
                <Route
                  path="/inventory/expenses"
                  render={(route) =>(that.props.activePracticePermissions.ViewExpenses || that.props.allowAllPermissions ?
                    <ExpensesList {...this.props} {...route} />:<PermissionDenied />)}
                />

                <Route
                  path="/inventory/manufacture"
                  render={(route) =>(that.props.activePracticePermissions.ViewManufacturer || that.props.allowAllPermissions?
                    <ManufactureList {...that.props} {...this.state} {...route} />:<PermissionDenied />)}
                />
                <Route
                  path="/inventory/lab"
                  render={(route) => (that.props.activePracticePermissions.Labs || that.props.allowAllPermissions ?
                    <LabList {...this.props} />:<PermissionDenied />)}
                />
                <Route
                  path="/inventory/activity"
                  render={(route) =>(that.props.activePracticePermissions.ViewActivities || that.props.allowAllPermissions ?
                    <ActivityList {...this.props} {...route} />:<PermissionDenied />)}
                />
                <Route
                  path="/inventory"
                  render={(route)=> (that.props.activePracticePermissions.ViewInventory || that.props.allowAllPermissions ?
                    <InventoryItemList {...route} {...this.props} />:<PermissionDenied />)}
                />
            </Switch>
</Content>
)
    }
}
