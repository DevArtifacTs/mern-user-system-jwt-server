import axios from 'axios';

const MAIN_URL = 'http://localhost:4001/api';

//get all user in database
export const userList = async (authToken) => {
    // console.log('authToken', authToken);
    const response = await axios.get(`${MAIN_URL}/users`,
    {
        headers : {
            authToken,
        }
    }
    );
    console.log('response.data', response.data);
    return response.data;
    }



//change role
export const changeStatus = async (authToken, selectedUser) => {
    return await axios.post(`${MAIN_URL}/change-status`, selectedUser, {
        headers: {
            authToken,
        }
    })
}


//changeUserRole
export const changeUserRole = async (authToken, selectedUser) => {
    return await axios.put(`${MAIN_URL}/change-role`, selectedUser, {
        headers: {
            authToken,
        }
    })
}

//delete user by _id
export const deleteUser = async (authToken, id) => {
    return await axios.delete(`${MAIN_URL}/users/${id}`, {
        headers: {
            authToken,
        }
    })
}

   
