import React, {useState, useEffect} from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';

//redux
import { useSelector } from 'react-redux';

//Antd
import { Switch } from 'antd';

//functions
import {userList, changeStatus } from '../../functions/users'

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
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 && data.map((user, index)=> {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.username}</td>
                                            <td><Switch checked={user.enabled} onChange={(e)=> handleChange(e, user._id)} /> </td>
                                            <td>{user.role}</td>
                                            <td>{user.createdAt}</td>
                                            <td>{user.updatedAt}</td>
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