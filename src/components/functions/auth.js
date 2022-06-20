import axios from 'axios';

const MAIN_URL = 'http://localhost:4001/api';

export const register = async (user) => {
    // console.log('MAIN_URL', MAIN_URL);
    const response = await axios.post(`${MAIN_URL}/register`, user);
    return response.data;
    }
export const login = async (user) => {
    // console.log('MAIN_URL', MAIN_URL);
    const response = await axios.post(`${MAIN_URL}/login`, user);
    return response.data;
    }


//send token to server and receive response to check if token is valid
export const currentUser = async (authToken) => {
    // console.log('authToken', authToken);
    const response = await axios.post(`${MAIN_URL}/current-user`, {},
    {
        headers : {
            authToken,
        }
    });
    console.log('response.data', response.data);
    return response.data;
    }
 