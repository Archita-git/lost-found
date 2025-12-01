import React from 'react'
import './LoginSignup.css'

const LoginSignup = () => {
  return (
    <>
    <div className="loginsignup2">
      <div className="container">
        <h1>SIGN UP</h1>

        <div className="fields">
          <input type='text' placeholder='your name'/>
          <input type='email' placeholder='email adress'/>
          <input type='password' placeholder='password'/>
        </div>

        <button className='continue'>continue</button>
         <div className="terms">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            By continuing I agree to <span>terms and conditions</span>
          </label>
        </div>

        <p className="abc">
          Already have an account? <span>Login here</span>
        </p>
        
       
        </div>
    </div>
    </>
  )
}

export default LoginSignup