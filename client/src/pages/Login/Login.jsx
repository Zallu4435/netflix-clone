import { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { toast } from 'react-toastify'


const Login = () => {

  const form  = useForm();
  const { register, control, handleSubmit, formState: {errors} } = form;

  const [signState, setSignState] = useState("Sign In");


  const navigate = useNavigate()

  const onSubmit = async(data) => {

    const formData = signState === 'Sign In'
    ? {password: data.password, email: data.email}
    : {username: data.username, email: data.email, password: data.password}

    const url = signState === 'Sign In'
    ? 'http://localhost:3001/user/signin'
    : 'http://localhost:3001/user/signup'

    try {
      console.log('from submitted', formData);
    
      const result = await axios.post(url, formData)

      console.log(result)

      if(signState === 'Sign In') {
        navigate('/')
      } else {
        setSignState('Sign In')
        navigate('/login')
      }

      form.reset();

    } catch(err) {
      // Capture and set error message from the server response
      if (err.response && err.response.data && err.response.data.message) {
        toast(err.response.data.message);
        form.reset()
      } else {
        toast("An unexpected error occurred. Please try again.");
      }
      console.error('Error during submission', err);
    }    
  } 
  
  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt='' onClick={() => navigate('/')}/>
      <div className='login-form'>
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {signState === "Sign Up" && 
            <div>
              <input 
                type='text'  
                placeholder='Your name' 
                {...register('username', {
                  required: {
                      value: true,
                      message: "Username is required"
                  },
                  validate: {
                    isValidateUser: (val) => {
                      const regex = /^[A-Za-z0-9]{3,}$/;
                      return regex.test(val) || "Enter a valid username"
                    }
                  }
                })}
            />
            {errors.username && <p className='err-msg'>{errors.username.message}</p>}
            </div>
          }
          <div>
            <input
              type='text' 
              placeholder='Email' 
              {...register('email', {
                required:{
                  value: true,
                  message: "Email is required"
                },
                validate:{
                  isValidateEmail: (val => {
                    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    return regex.test(val) || "pls enter a valid email";
                  })
                }
              })}
            />
            {errors.email && <p className='err-msg'>{errors.email.message}</p>}
          </div>
          <div>
            <input
              type='password' 
              placeholder='Password' 
              {...register('password', {
                required: {
                  value: true,
                  message: "Password is required"
                },
                validate: {
                  isValidatePassword: (val => {
                    const regex = /^(?=.*\d).{6,}$/;
                    return regex.test(val) || "Enter a valid password"
                  }) 
                }
              })}
            />
            {errors.password && <p className='err-msg'>{errors.password.message}</p>}
          </div>
          <button>{signState}</button>
          <div className='form-help'>
            <div className='remember'>
              <input type='checkbox' />
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <DevTool  control={control}/>
        <div className="form-switch">
          {signState === 'Sign In' ?
            <p>New to Netflix? <span onClick={() => {setSignState("Sign Up")}}>Sign Up Now</span></p> :
            <p>Already have account? <span onClick={() => {setSignState("Sign In")}}>Sign In Now</span></p>
          } 
        </div>
      </div>
    </div>
  )
}

export default Login