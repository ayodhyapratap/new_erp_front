import React from "react";
import {Button, Card, Icon, Modal, Tag, Divider, Popconfirm, Table, Row, Radio} from "antd";
import {getAPI, interpolate, deleteAPI} from "../../../utils/common";
import {
    INVENTORY_ITEM_API,
    SINGLE_INVENTORY_ITEM_API,
    MANUFACTURER_API,
    TAXES,
    VENDOR_API, ITEM_TYPE_STOCK
} from "../../../constants/api";
import {Link, Route, Switch} from "react-router-dom";
import AddorEditInventoryItem from "./AddorEditInventoryItem";
import AddItemType from "./AddItemType";
import AddOrConsumeStock from "./AddOrConsumeStock"
import {ADD_STOCK, CONSUME_STOCK, INVENTORY_ITEM_TYPE} from "../../../constants/hardData"

export default class InventoryItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invantoryItems: [], //All List
            inventoryItemList: [], // Filtered List
            active_practiceId: this.props.active_practiceId,
            stockModalVisibility: false,
            itemTypeFilter: "ALL"
        }
        this.loadData = this.loadData.bind(this);
        this.showAddOrConsumeModal = this.showAddOrConsumeModal.bind(this);
        this.setActionType = this.setActionType.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }

    componentDidMount() {
        this.loadData();
        this.loadTaxes();
        this.loadManufactureList();
        this.loadVendorList();
    }

    loadData() {
        let that = this;
        let successFn = function (data) {
            that.setState(function (prevState) {
                let inventoryItemList = [];
                if (prevState.itemTypeFilter == "ALL") {
                    inventoryItemList = data
                } else {
                    data.forEach(function (item) {
                        if (item.inventory_item.item_type == prevState.itemTypeFilter)
                            inventoryItemList.push(item);
                    })
                }
                return {
                    invantoryItems: data,
                    inventoryItemList: inventoryItemList
                }
            })
        }
        let errorFn = function () {
        }
        getAPI(ITEM_TYPE_STOCK, successFn, errorFn);
    }

    loadManufactureList() {
        let that = this;
        let successFn = function (data) {
            that.setState({
                manufacture_list: data
            })
        }
        let errorFn = function () {
        }
        getAPI(MANUFACTURER_API, successFn, errorFn);
    }

    loadTaxes() {
        var that = this;
        let successFn = function (data) {
            console.log("get table");
            that.setState({
                taxes_list: data,
            })
        };
        let errorFn = function () {
        };
        getAPI(interpolate(TAXES, [this.props.active_practiceId]), successFn, errorFn);

    }

    loadVendorList() {
        let that = this;
        let successFn = function (data) {
            that.setState({
                vendor_list: data
            })
        }
        let errorFn = function () {

        }
        getAPI(VENDOR_API, successFn, errorFn);
    }

    deleteObject(value) {
        var that = this;
        let successFn = function (data) {
            that.loadData();
            console.log("Deleted");
        };
        let errorFn = function () {
        };
        deleteAPI(interpolate(SINGLE_INVENTORY_ITEM_API, [value]), successFn, errorFn);

    }

    setActionType(type, item_Id) {
        this.setState({
            itemId: item_Id,
            actionType: type,
        })
        this.showAddOrConsumeModal(true);
    }

    showAddOrConsumeModal(type) {
        this.setState({
            stockModalVisibility: type,
        })
    }

    changeFilter(e) {
        this.setState(function (prevState) {
            if (e.target.value == "ALL") {
                return {
                    inventoryItemList: prevState.invantoryItems
                }
            } else {
                let filteredList = [];
                prevState.invantoryItems.forEach(function (item) {
                    if (item.inventory_item.item_type == e.target.value)
                        filteredList.push(item);
                });
                return {inventoryItemList: filteredList}
            }
        })
    }

    render() {
        const taxesdata = {}
        if (this.state.taxes_list) {
            this.state.taxes_list.forEach(function (tax) {
                taxesdata[tax.id] = tax;
            })
        }
        const manufacturerData = {}
        if (this.state.manufacture_list) {
            this.state.manufacture_list.forEach(function (manufacturer) {
                manufacturerData[manufacturer.id] = manufacturer.name;
            })
        }
        const vendorData = {}
        if (this.state.vendor_list) {
            this.state.vendor_list.forEach(function (vendor) {
                vendorData[vendor.id] = vendor.name;
            })
        }
        let that = this;
        let columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (value,record) => <span>{record.inventory_item.name}</span>
        }, {
            title: 'Item Code',
            dataIndex: 'code',
            key: 'code',
            render: (value,record) => <span>{record.inventory_item.code}</span>
        }, {
            title: 'Stocking Unit',
            dataIndex: 'stocking_unit',
            key: 'stocking_unit'
        }, {
            title: 'Retail Price (INR)',
            dataIndex: 'retail_price',
            key: 'retail_price',
            render: (value, record) => <span>{record.inventory_item.retail_price}
                {record.inventory_item.taxes.map(tax =>
                    <small> {(taxesdata[tax] ? taxesdata[tax].name + "@" + taxesdata[tax].tax_value + "%" : null)}</small>
                )}
                </span>
        }, {
            title: 'Item type',
            dataIndex: 'item_type',
            key: 'item_type',
            render: (value,record) => <span>{record.inventory_item.item_type}</span>
        }, {
            title: 'Reorder Level',
            dataIndex: 're_order_level',
            key: 're_order_level',
            render: (value,record) => <span>{record.inventory_item.re_order_level}</span>
        }, {
            title: 'Manufacturer',
            key: 'manufacturer',
            render: (text, record) => (
                <span> {manufacturerData[record.inventory_item.manufacturer]}</span>
            )
        },
            //     {
            //     title:'Action',
            //     render:(item)=>{
            //         return <div>
            //           <a onClick={()=>this.setActionType(ADD_STOCK,item.id)}>Add </a>
            //             <Divider type="vertical"/>
            //             <a onClick={()=>this.setActionType(CONSUME_STOCK,item.id)}>Consume</a>
            //         </div>
            //     }
            // },
            {
                title: 'Actions',
                render: (item) => {
                    return <div>
                        <Link to={"/inventory/edit/" + item.id}>Edit Details </Link>
                        <Divider type="vertical"/>
                        <Link to={"/inventory/edit-item-type/" + item.id}>Edit stock type </Link>
                        <Divider type="vertical"/>
                        <Popconfirm title="Are you sure delete this item?"
                                    onConfirm={() => that.deleteObject(item.id)} okText="Yes" cancelText="No">
                            <a>Delete</a>
                        </Popconfirm>
                    </div>
                }
            }];
        return <div>
            <Switch>
                <Route path="/inventory/add" render={(route) => <AddorEditInventoryItem {...route} {...this.state}/>}/>
                <Route path="/inventory/edit-item-type/:id"
                       render={(route) => <AddItemType {...route} {...this.state}/>}/>
                <Route exact path='/inventory/edit/:id'
                       render={(route) => <AddorEditInventoryItem {...this.state} {...route}/>}/>
                <Route exact path='/inventory/consume-stock'
                       render={(route) => <AddOrConsumeStock key={CONSUME_STOCK}
                                                             type={CONSUME_STOCK}
                                                             loadData={this.loadData}
                                                             {...this.state} {...route}/>}/>
                <Route exact path='/inventory/add-stock'
                       render={(route) => <AddOrConsumeStock key={ADD_STOCK}
                                                             type={ADD_STOCK}
                                                             loadData={this.loadData}
                                                             {...this.state} {...route}/>}/>
                <Route>
                    <Card title="Inventory List"
                          extra={<div>
                              <Link to="/inventory/add"><Button type="primary"><Icon type="plus"/> Add Item</Button></Link>
                              <Link to="/inventory/add-stock"><Button type="primary">Add Stock</Button></Link>
                              <Link to="/inventory/consume-stock"><Button type="primary">Consume Stock</Button></Link>
                          </div>}>
                        <Row>
                            <Radio.Group defaultValue={"ALL"} buttonStyle="solid" onChange={this.changeFilter}>
                                <Radio.Button value={"ALL"}>ALL</Radio.Button>
                                {INVENTORY_ITEM_TYPE.map(item =>
                                    <Radio.Button value={item.value}>
                                        {item.label}
                                    </Radio.Button>)}
                            </Radio.Group>
                        </Row>
                        <br/>
                        <Table pagination={false} bordered={true} dataSource={this.state.inventoryItemList} columns={columns}/>
                        <Modal visible={this.state.stockModalVisibility}
                               title={"Stock" + this.state.actionType}
                               onOk={() => this.showAddOrConsumeModal(false)}
                               onCancel={() => this.showAddOrConsumeModal(false)}
                               footer={null}>
                            <AddOrConsumeStock showAddOrConsumeModal={this.showAddOrConsumeModal}
                                               itemId={this.state.itemId}
                                               actionType={this.state.actionType}/>
                        </Modal>
                    </Card>
                </Route>
            </Switch>

        </div>
    }


}