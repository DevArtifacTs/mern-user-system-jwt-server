import React from 'react'

//Antd
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

//React Router
import { Link, useNavigate } from 'react-router-dom';

//redux
import {useDispatch} from 'react-redux'; 

//reducer
import { signOut } from '../../store/slices/authSlice';

function Navbar() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirectToSignIn = () => {
    navigate('/');
  }

  const logOut = () => {
    dispatch(signOut());
    redirectToSignIn();
  }
  
  return (
    <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
    
        <Menu.Item key="login" icon={<MailOutlined />}>
            <Link to='/login' >Login</Link>
        </Menu.Item>

        <Menu.Item key="register" icon={<MailOutlined />}>
            <Link to='/register' >Register</Link>
        </Menu.Item>    
        
        <Menu.Item onClick={logOut} key="logout" icon={<MailOutlined />}>
            Logout
        </Menu.Item>    
    </Menu>
  )
}

export default Navbar