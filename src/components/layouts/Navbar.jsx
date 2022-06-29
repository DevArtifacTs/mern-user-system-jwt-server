import React from 'react'

//Antd
import { 
  HomeOutlined, 
  LoginOutlined, 
  UserAddOutlined,
  PoweroffOutlined } from '@ant-design/icons';

import { Menu } from 'antd';

//React Router
import { Link, useNavigate } from 'react-router-dom';

//redux
import {useDispatch, useSelector} from 'react-redux'; 

//reducer
import { signOut } from '../../store/slices/authSlice';

function Navbar() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { role, username } = useSelector(state => state.auth);
  console.log('currentUser\'s role : ', role);

  const redirectToSignIn = () => {
    navigate('/');
  }

  const logOut = () => {
    dispatch(signOut());
    redirectToSignIn();
  }
  
  return (
    <Menu mode="horizontal"   >
      <div className="container-fluid">
        <div className="row d-flex justify-content-end ">
          <div className="col-6 d-flex justify-content-start ">
            <Menu.Item  key="login" icon={<HomeOutlined />} >
                <Link to={role === 'admin' ? '/admin/home' :  '/user/home' } >Home</Link>
            </Menu.Item>
          </div>

          {username
          ? 
            <>
              <div className="col-3 text-center"> 
                <button type="button" class="btn btn-primary">
                Welcome Back <span class="badge bg-secondary">{username }</span>
                </button>
              </div>
              <div className="col-2">
                <Menu.Item onClick={logOut} key="logout" icon={<PoweroffOutlined />}>
                    Logout
                </Menu.Item>    
              </div>
            </>
          : 
            <>
              <div className="col-2">
                <Menu.Item  key="login" icon={<LoginOutlined />} >
                    <Link to='/login' >Login</Link>
                </Menu.Item> 
              </div>
              <div className="col-2">
                <Menu.Item key="register" icon={<UserAddOutlined />}>
                    <Link to='/register' >Register</Link>
                </Menu.Item>    
              </div>
            </>
          }
          
        </div>
      </div>

        
    </Menu>
  )
}

export default Navbar