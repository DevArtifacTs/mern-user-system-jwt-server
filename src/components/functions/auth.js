import axios from 'axios';

const MAIN_URL = 'http://localhost:4001/api';

export const register = async (user) => {
    // console.log('MAIN_URL', MAIN_URL);
    const response = await axios.post(`${MAIN_URL}/register`, user);
    return response.data;
    }
 