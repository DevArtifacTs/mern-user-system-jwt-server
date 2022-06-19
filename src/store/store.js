import { configureStore } from '@reduxjs/toolkit';

//import slices
import authReducer from './slices/authSlice';

// create store
export default configureStore({
    reducer : {
        auth : authReducer
    }
})