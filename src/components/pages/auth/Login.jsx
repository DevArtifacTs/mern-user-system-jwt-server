import React, {useState} from 'react'
import { login } from '../../functions/auth'

//redux
import { useSelector, useDispatch } from 'react-redux'

//middleware asyncThunk function
import { signInAsync } from '../../../store/slices/authSlice'

//useNavigate()
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [values, setValues] = useState({
      username : '',
      password : '',
    })

    const { loading, error} = useSelector(state => state.auth)
    
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value })
    }

    const navigateBaseOnRole = (role) => {
        if(role === "admin"){
            navigate('/admin/home');
        } else {
            navigate('/user/home');
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();  

        dispatch(signInAsync(values))
            .then(res=> {
                console.log(res);
                alert('Success');
                //store token in local storage
                localStorage.setItem('token', res.payload.token); 
                console.log('token: ', res.payload.token)
                console.log('role: ', res.payload.role)
                navigateBaseOnRole(res.payload.role);
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
                {error ? 
                    <button >{error}</button> 
                    :<button >{loading? 'Loading...' : 'Login' }</button>
                }
                
            </form>
        </div>
    )
}

export default Login;