import React, {useState, useEffect} from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';

//redux
import { useSelector } from 'react-redux';

//functions
import {userList } from '../../functions/users'

function ManageAdmin(props) {

    const currentUser = useSelector(state => state.auth)
    
    const [data, setData] = useState([]);
    
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
                                            <td>{user.enabled}</td>
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