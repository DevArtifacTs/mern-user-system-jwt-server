import React, {useState} from 'react'
import { login } from '../../functions/auth'

//redux
import { useSelector, useDispatch } from 'react-redux'

//middleware asyncThunk function
import { signInAsync } from '../../../store/slices/authSlice'

const Login = () => {

    const dispatch = useDispatch();

    const [values, setValues] = useState({
      username : '',
      password : '',
    })

    const { loading, error} = useSelector(state => state.auth)
    
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();  

        // login(values)
        dispatch(signInAsync(values))
            .then(res=> {
                console.log(res);
                alert('Success');
                
            }) 
            .catch(err=>{
                console.log(err.response);
                // alert(err.response.data);
                alert(err.response);
            })
    

    }

    console.log('values: ', values);

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="">username</label>
                <input type="text" name='username' onChange={handleChange} />

                <label htmlFor="">password</label>
                <input type="password" name='password' onChange={handleChange} />

                <button >Login</button>

            </form>
        </div>
    )
}

export default Login;