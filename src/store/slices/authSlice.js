//Todo 1. import createSlice() API
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

//Todo 2. define initial state of the slice
const initialState = {
    username : null,
    loading : false,
    error : '',
}

//Todo 2.1. define middleware for async operations
export const signInAsync = createAsyncThunk('auth/signIn', async userObject => {
    //user ; { username : '', password : '' }
    try{
        //post user object to server and receive response
        const response = await axios.post('http://localhost:4001/api/login', userObject)
        const {token} = response.data
        const {user} = response.data.payload;
        console.log('response: ', response);
        console.log('TOKEN: ', token, 'USER: ', user);
        //create a object payload with token and user
        const userData = { token : token, user : user }; 
        return userData ; // return action object to the extraReducer and this value will be appear in extraReducer
    } catch(err) {
        throw err ;
    }
});

//Todo 3. define action creators and reducers
export const authSlice = createSlice({

    //Todo 3.1. define slice name
    name : 'auth',
    
    //Todo 3.2. define slice state
    initialState,
    
    //Todo 3.3. define action creators and sync reducers
    reducer : {
        signOut : (state, action) => {
            state.username = null;
            state.loading = false;
            state.error = null;
        }
    },
    
    //Todo 3.4. define action creators and async reducers
    extraReducers : {
        [signInAsync.pending] : (state, action) => {
            state.loading = true;
            state.error = '';
        },
        [signInAsync.fulfilled] : (state, action) => {
            state.loading = false;
            state.username = action.payload;  // anything that return from async thunk it will be a payload
            state.error = '';
        },
        [signInAsync.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }

})

//Todo 4. export action creators and reducer
export const { signOut } = authSlice.actions;
export default authSlice.reducer;