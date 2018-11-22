import React from "react";
import {Avatar, Dropdown, Icon, Layout, Menu} from "antd";
import {Route, Link, Switch} from 'react-router-dom';

const {Header} = Layout;

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userMenu = (
            <Menu>
                {/*<Menu.Item>*/}
                {/*UserName*/}
                {/*</Menu.Item>*/}
                <Menu.Item>
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                {/*<Menu.Item>*/}
                {/*<Link to="/settings">Settings</Link>*/}
                {/*</Menu.Item>*/}
                <Menu.Item>
                    <a onClick={this.props.logout}>Log out</a>
                </Menu.Item>
            </Menu>
        );
        return <Header style={{ background: '#fff', padding: 0 }}>
            <Menu mode="horizontal"
                  style={{lineHeight: '64px'}}>

                <Menu.Item key="4">
                    <Link to="/">
                        <div className="logo"/>
                    </Link>

                </Menu.Item>
                {/*<Menu.Item key="3"><Search*/}
                {/*placeholder="Search"*/}
                {/*onSearch={value => console.log(value)}*/}
                {/*style={{width: 200}}*/}
                {/*/></Menu.Item>*/}

                <div style={{float: 'right', margin: '0px 20px'}}>
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggleSider}
                    />
                    <Dropdown overlay={userMenu} placement="bottomRight">
                        <Avatar style={{backgroundColor: '#87d068'}} icon="user"/>
                    </Dropdown>
                </div>

            </Menu>
        </Header>
    }
}

export default AppHeader;
