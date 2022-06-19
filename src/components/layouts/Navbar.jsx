import React from 'react'

//Antd
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

//React Router
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
    
        <Menu.Item key="login" icon={<MailOutlined />}>
            <Link to='/login' >Login</Link>
        </Menu.Item>

        <Menu.Item key="register" icon={<MailOutlined />}>
            <Link to='/register' >Register</Link>
        </Menu.Item>    
    </Menu>
  )
}

export default Navbar