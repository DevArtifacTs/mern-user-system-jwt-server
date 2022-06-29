import React, {useState} from 'react'
import { register } from '../../functions/auth'

//React Toastify
import { toast } from 'react-toastify';

const Register = () => {

  const notify = () => toast("Register Successfully");

  const [values, setValues] = useState({
    username : '',
    password : '',
    password2: '',
  })

  // const [error, setError] = useState('')

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(values.password !== values.password2) {
      // setError('Password does not match')
      toast.error('Passwords do not match');
      return;
    } else {
      // alert('Success');
      
      //send request to server
      register(values)
        .then(res=> {
          console.log(res);
          toast.success('Register Successfully');
          // notify();
        }) 
        .catch(err=>{
          console.log(err.response);
          // alert(err.response.data);
          toast.error(err.response.data);
        })
    }

  }

  console.log('values: ', values);

  return (
    <div className='container mt-5 p-5 ' style={{background:'#dbdbf3', maxWidth:'550px'}} >
      <h1>Register</h1>
      <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating ">
                          <input 
                            id='username'
                            className='form-control'
                            type="text" 
                            name='username' 
                            onChange={handleChange} 
                          />
                          <label for="username" >username</label>
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
                        <br />
                        <div className="form-floating">
                            <input 
                                id='password'
                                className='form-control' 
                                type="password" 
                                name='password2' 
                                onChange={handleChange} 
                            />
                            <label for="password">confirm password</label>
                            {/* {error &&  <p className='text-danger'>{error}</p>} */}
                        </div>
                        <br/>
                        <button 
                          className='btn btn-primary'
                          disabled={values.password.length < 6 } 
                        >
                          Submit
                        </button>

                    </form>

                </div>
            </div>
    </div>
  )
}

export default Register;