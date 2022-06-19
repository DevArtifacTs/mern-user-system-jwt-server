import React, {useState} from 'react'

function Login() {
    const [values, setValues] = useState({
        username : '',
        password : '',
        password2: '',
    })
    
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(values.password !== values.password2) {
            alert('Passwords do not match');
            return;
        } else {
            
        }
    
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
        
            <label htmlFor="">confirm password</label>
            <input type="password" name='password2' onChange={handleChange} />
        
            <button disabled={values.password.length < 6 } >Submit</button>

        </form>
    </div>
  )
}

export default Login