import React from 'react';
import MenuConfig from '../../config/menuConfig';
import { NavLink } from 'react-router-dom';
import {Menu, Icon} from 'antd';
import './nav.less';
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
    
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);

        this.setState({
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if(item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                        <NavLink to={"/admin"+item.key} >{item.title}</NavLink>
                   </Menu.Item>
        })
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>ZRJ MS</h1>
                </div>
                <Menu theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

export default NavLeft;