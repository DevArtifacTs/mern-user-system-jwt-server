import React, {useState, useEffect} from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';

//redux
import { useSelector } from 'react-redux';

//Antd
import { Switch, Select, Tag } from 'antd';

//Antd Icons
import { DeleteOutlined, EditOutlined } from '@ant-design/icons' 

//functions
import {userList, changeStatus, changeUserRole, deleteUser } from '../../functions/users'

//moment.js
import moment from 'moment/min/moment-with-locales';

function ManageAdmin(props) {

    const currentUser = useSelector(state => state.auth)
    
    const [data, setData] = useState([]);

    console.log('currentUser.token: ', currentUser.token)
    
    console.log('data :', data);
    useEffect(()=>{
        loadData(currentUser.token);
    }, [ ])

    const loadData = (authToken) => {
        userList(authToken)
            .then(res=>{
                //code
                setData(res)
            }).catch(err=>{
                //code
                console.log('err in user manage: ',err.response.data)
            })
    }

    const handleChange = (e, id) => {
        console.log('checked = ', e);
        console.log('_id = ', id);
        const selectedUser = {
            id : id,
            enabled : e
        }

        changeStatus(currentUser.token, selectedUser)
            .then(res=> {
                console.log(res);

                //fetch data when request is success to make this page re-render again
                loadData(currentUser.token);

            }).catch(err=> {
                console.log(err.response)
            });
    }

    const handleUserRoleChange = (e, id) => {
        console.log('role = ', e);
        console.log('_id = ', id);
        const selectedUser = {
            id : id,
            role : e
        }

        changeUserRole(currentUser.token, selectedUser)
            .then(res=>{
                console.log(res)

                //fetch data when request is success to make this page re-render again
                loadData(currentUser.token);

            }).catch(err=> {
                console.log(err)
            })
    }

    const handleRemove = (id) => {
        if(window.confirm('Are you sure to delete this user?')){
            console.log('id = ', id);
        }
            deleteUser(currentUser.token, id)
                .then(res=>{
                    console.log(res)
                
                    //fetch data when request is success to make this page re-render again
                    loadData(currentUser.token);
                
                }).catch(err=> {
                    console.log(err)
                })
    }


    const roleData = ['admin', 'user'];

    return (
        <>
            <div className='container-fluid' >
                <div className="row">
                    <div className="col-md-2">
                        <MenubarAdmin />
                    </div>
                    <div className="col">
                        <h1>Manage Admin Page</h1>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">username</th>
                                    <th scope="col">status</th>
                                    <th scope="col">role</th>
                                    <th scope="col">created</th>
                                    <th scope="col">updated</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 && data.map((user, index)=> {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.username}</td>
                                            <td><Switch checked={user.enabled} onChange={(e)=> handleChange(e, user._id)} /> </td>
                                            <td>
                                                <Select
                                                    onChange={(e)=> handleUserRoleChange(e, user._id)}
                                                    value={user.role} 
                                                    style={{width:'100%'}} 
                                                    >    
                                                    {roleData.map((role, index)=> {
                                                        return (
                                                            <Select.Option key={index} value={role} >
                                                                {role === 'admin'
                                                                ? <Tag color='green' >{role}</Tag>
                                                                : <Tag color='grey' >{role}</Tag>
                                                                }
                                                            </Select.Option>
                                                        )
                                                    })
                                                    }
                                                </Select>
                                            </td>
                                            <td>{moment(user.createdAt).locale('th').format('LL')}</td>
                                            <td>{moment(user.updatedAt).locale('th').startOf('minute').fromNow()}</td>
                                            <td> <button onClick={()=> handleRemove(user._id)} style={{border:'0', background:'none'}} ><DeleteOutlined /></button> </td>
                                            <td> <button onClick={()=> handleRemove(user._id)} style={{border:'0', background:'none'}} ><EditOutlined /></button> </td>
                                        </tr>
                                        )
                                })
                                }
                               
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageAdmin;