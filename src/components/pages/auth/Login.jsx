import React, {useState} from 'react'
import { login } from '../../functions/auth'

//redux
import { useSelector, useDispatch } from 'react-redux'

//middleware asyncThunk function
import { signInAsync } from '../../../store/slices/authSlice'

//useNavigate()
import { useNavigate } from 'react-router-dom'

//React Toastify
import { toast } from 'react-toastify';

//React Spinner
import { CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };



const Login = () => {

    //React Spinner
    // let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#063ffa");

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
                console.log('login response = ', res);
                if(res.meta.requestStatus === "rejected"){
                    toast.error(res.error.message);
                } else{
                    toast.info( ` welcome ${res.payload.username}, ${res.payload.role}` );
                    localStorage.setItem('token', res.payload.token); 
                    navigateBaseOnRole(res.payload.role);
                }
                
                
                // alert('Success');
                //store token in local storage
                // console.log('token: ', res.payload.token)
                // toast.info('token: ', res.payload.token)
                // console.log('role: ', res.payload.role)
                // toast.info('role: ', res.payload.role)
            }) 
            .catch(err=>{
                console.log(err.response);
                // alert(err.response.data);
                // alert(err.response);
                toast.error(err.response);
            })
        
    }

    // console.log('values: ', values);

    return (
        <div className='container mt-5 p-5 ' style={{background:'#dbdbf3', maxWidth:'550px'}} >
            <h1 className='' >Login</h1>
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit}>

                        {/* <div className="form-group text-start"> */}
                        <div className="form-floating ">
                            <input 
                                id='username'
                                className='form-control' 
                                type="text" 
                                name='username' 
                                onChange={handleChange} 
                            />
                            <label for="username">username</label>
                        </div>
                        <br />
                        <div className="form-floating">
                            <input 
                                id='password'
                                className='form-control' 
                                type="password" 
                                name='password' 
                                onChange={handleChange} 
                            />
                            <label for="password">password</label>
                        </div>
                        {error 
                            ? <p>{error}</p> 
                            : <p></p>
                        }
                        <br />
                        {loading
                        ? <DotLoader color={color} loading={loading} cssOverride={override} size={30} />
                        : <button className='btn btn-success' >{loading? 'Loading...' : 'Login' }</button>
                        }
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;