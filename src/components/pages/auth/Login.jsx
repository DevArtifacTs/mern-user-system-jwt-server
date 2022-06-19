import React, {useState} from 'react'
import { login } from '../../functions/auth'

const Login = () => {

  const [values, setValues] = useState({
    username : '',
    password : '',
  })

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();  

    login(values)
        .then(res=> {
            console.log(res);
            alert('Success');
        }) 
        .catch(err=>{
            console.log(err.response);
            alert(err.response.data);
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