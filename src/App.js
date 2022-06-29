import './App.css';
import React, {useState, useEffect} from 'react';
//Pages
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';
import Home from './components/pages/Home';

//Layouts
import Navbar from './components/layouts/Navbar';

import { Routes , Route } from 'react-router-dom';

//pages
import AdminHome from './components/pages/admin/Home';
import UserHome from './components/pages/user/Home';
import ManageAdmin from './components/pages/admin/ManageAdmin';

//tokenChecker function
import {currentUser } from './components/functions/auth';

//redux
import {useDispatch } from 'react-redux'
import { currentUserCheck } from './store/slices/authSlice';

//routes
import UserRoutes from './components/routes/UserRoute.jsx';
import AdminRoute from './components/routes/AdminRoute.jsx';

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const dispatch = useDispatch();

  const idToken = localStorage.token
  if (idToken) {
    console.log('token is exist', idToken)
    //send token in a local storage to server and receive response to check if token is valid
    currentUser(idToken)
      .then((res)=> {
        console.log('current user', res)
        console.log('current user name:', res.username)
        console.log('current user role:', res.role)
        //
        dispatch(currentUserCheck(
          {
            username : res.username, 
            token : idToken,
            role : res.role
          }))
          
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  return (
    <div className="App">
      {/* <h1>MERN User System</h1> */}
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
{/* ------------------------------------------Admin Only----------------------------------------------------------- */}
        <Route path='/admin/home' 
          element={
          <AdminRoute>
            <AdminHome/>
          </AdminRoute>
          } />

        <Route path='/admin/manage-admin' 
          element={
          <AdminRoute>
            <ManageAdmin/>
          </AdminRoute>
          } />
{/* ------------------------------------------User----------------------------------------------------------- */}
        {/* we want user role can access only UserHome component */}
        <Route path='/user/home' 
          element={
              <UserRoutes>
                <UserHome/>
              </UserRoutes>
              } />
      
      
      </Routes>
    </div>
  );
}

export default App;
