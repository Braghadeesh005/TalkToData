import React from 'react'
import './Login.css'
import pic from './google-icon.png'

const Login = () => {
  
  const handleGoogleAuthClick = () => {
    window.open(`http://localhost:4000/auth/google/signup/callback`, '_self');
  };

  return (
    <>
    <h1 className='title'> Talk to Data App</h1>
      <div className='signup-container'>
        <button onClick={handleGoogleAuthClick} className='signup-button' > <span>Login / Signup With</span><img src={pic} className='google' alt='google'/></button>
      </div>
    </>
  )
}

export default Login