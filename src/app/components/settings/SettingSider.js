import React from "react";
import {Divider, Icon, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';


const {Sider} = Layout;

class SettingSider extends React.Component {

    render() {
        return (
<Sider
  trigger={null}
  collapsible
  style={{overflow: 'auto', minHeight: '100vh', background: '#fff'}}
>

            <Menu mode="inline" defaultSelectedKeys={['5']}>
                <Menu.ItemGroup key="g1" title={<Divider style={{margin: '0px'}}>Practice Settings</Divider>}>
                    {this.props.activePracticePermissions.SettingsPracticeDetail ? (
<Menu.Item key="5">
                        <Link to="/settings/clinics">
                            <Icon type="shop" />Practice Details
                        </Link>
</Menu.Item>
) : null}

                    {this.props.activePracticePermissions.SettingsCommunincations ? (
<Menu.Item key="7">
                        <Link to="/settings/communication-settings">
                            <Icon type="message" />Communication
                        </Link>
</Menu.Item>
) : null}
                    {this.props.activePracticePermissions.SettingsCalendar ? (
<Menu.Item key="17">
                        <Link to="/settings/calendarsettings#timings">
                            <Icon type="schedule" />Calendar
                        </Link>
</Menu.Item>
) : null}
                    {this.props.activePracticePermissions.SettingsPracticeStaff ? (
<Menu.Item key="6">
                        <Link to="/settings/clinics-staff">
                            <Icon type="team" />Practice Staff
                        </Link>
</Menu.Item>
) : null}
                    {/* {this.props.activePracticePermissions.ZoomUser? */}
                    {/*    <Menu.Item key={'35'}> */}
                    {/*        <Link to="/settings/zoom-user"> */}
                    {/*            <Icon type={"user"}/> */}
                    {/*            <span className="nav-text">Zoom User</span> */}
                    {/*        </Link> */}
                    {/*    </Menu.Item>:null} */}

                    {this.props.activePracticePermissions.SettingsAgents || this.props.allowAllPermissions? (
                    <Menu.Item key="32">
                        <Link to="/settings/agents">
                            <Icon type="usergroup-add" />
                            <span className="nav-text">Advisor</span>
                        </Link>
                    </Menu.Item>
                  ):null}

                    {this.props.activePracticePermissions.SettingsAgentRoles || this.props.allowAllPermissions? (
                    <Menu.Item key="33">
                        <Link to="/settings/agent-roles">
                            <Icon type="apartment" />
                            <span className="nav-text">Advisor Roles</span>
                        </Link>
                    </Menu.Item>
                  ):null}

                    {this.props.activePracticePermissions.SettingsProcedureCatalog ? (
<Menu.Item key="8">
                        <Link to="/settings/procedures">
                            <Icon type="folder-open" />Procedure
                            Catalog
                        </Link>
</Menu.Item>
) : null}
                    {this.props.activePracticePermissions.SettingsBilling ? (
<Menu.Item key="9">
                        <Link to="/settings/billing#taxcatalog">
                            <Icon type="audit" />Billing
                        </Link>
</Menu.Item>
) : null}
                    {this.props.activePracticePermissions.SettingsLoyalty ? (
<Menu.Item key="10">
                        <Link to="/settings/loyalty">
                            <Icon type="trophy" />Loyalty
                        </Link>
</Menu.Item>
) : null}



                    {this.props.activePracticePermissions.SettingsMLMSettings ? (
<Menu.Item key="30">
                        <Link to="/settings/mlm">
                            <Icon type="wallet" />
                            <span className="nav-text">MLM</span>
                        </Link>
</Menu.Item>
) : null}
                    {/* <Menu.Item key="11"><Link to="/settings/contacts"> Contacts</Link></Menu.Item> */}
                    {this.props.activePracticePermissions.SettingsEMR ? (
<Menu.Item key="12">
                        <Link to="/settings/emr#complaints">
                            <Icon type="file-text" /> EMR
                        </Link>
</Menu.Item>
) : null}
                    {this.props.activePracticePermissions.SettingsPrescriptions ? (
<Menu.Item key="13">
                        <Link to="/settings/prescriptions">
                            <Icon type="file-text" /> Prescriptions
                        </Link>
</Menu.Item>
) : null}
                    {this.props.activePracticePermissions.SettingsLabs ? (
<Menu.Item key="14">
                        <Link to="/settings/labs">
                            <Icon type="experiment" />Labs
                        </Link>
</Menu.Item>
) : null}
                    {this.props.activePracticePermissions.SettingsPrintouts ? (
                        <Menu.Item key="18">
                            <Link to="/settings/printout">
                                <Icon type="printer" /> Printout
                            </Link>
                        </Menu.Item>
                      ) : null}
                    {/* {this.props.activePracticePermissions.SettingsEmailPDFSettings ? */}
                    {/*    <Menu.Item key="21"> */}
                    {/*        <Link to="/settings/mailpdfsettings"> */}
                    {/*            <Icon type="mail"/> Email PDF Settings */}
                    {/*        </Link> */}
                    {/*    </Menu.Item> : null} */}
                    {this.props.activePracticePermissions.SettingsMedicalHistory ? (
<Menu.Item key="15">
                        <Link to="/settings/medical-history">
                            <Icon type="medicine-box" /> Medical History
                        </Link>
</Menu.Item>
) : null}
                    {this.props.activePracticePermissions.SettingsExpenseTypes ? (
<Menu.Item key="16">
                        <Link to="/settings/expense-types">
                            <Icon type="dollar" /> Expense Types
                        </Link>
</Menu.Item>
) : null}

                    <Menu.Item key="20">
                        <Link to="/settings/integration">
                            <Icon type="link" /> My Integrations
                        </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title={<Divider style={{margin: '0px'}}>Bed & Medicine</Divider>}>
                {this.props.activePracticePermissions.SettingsRoomTypes ? (
                    <Menu.Item key="22">
                        <Link to="/settings/roomtypes">
                            <Icon type="apartment" /> Room Types
                        </Link>
                    </Menu.Item>
                  )
                :null}

                {this.props.activePracticePermissions.SettingsBedPackages ? (
                    <Menu.Item key="23">
                        <Link to="/settings/bed-packages">
                            <Icon type="box-plot" /> Bed Packages
                        </Link>
                    </Menu.Item>
                  )
                :null}

                {this.props.activePracticePermissions.SettingsMedicinePackages ? (
                    <Menu.Item key="24">
                        <Link to="/settings/medicine-packages">
                            <Icon type="medicine-box" /> Medicine Packages
                        </Link>
                    </Menu.Item>
                  )
                :null}

                {this.props.activePracticePermissions.SettingsDiseaseList ? (
                    <Menu.Item key="25">
                        <Link to="/settings/diseases">
                            <Icon type="apartment" /> Disease List
                        </Link>
                    </Menu.Item>
                  )
                :null}
                </Menu.ItemGroup>


            </Menu>

</Sider>
)
    }
}

export default SettingSider;
