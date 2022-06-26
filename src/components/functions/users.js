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


   
