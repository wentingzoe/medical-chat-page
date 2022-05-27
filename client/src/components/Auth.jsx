import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
  fullname: '',
  username: '',
  password: '',
  confirmpassword: '',
  phonenumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { fullname, username, password, phonenumber, avatarurl } = form;
    const URL = 'http://localhost:8000/auth';
    const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, { fullname, username, password, phonenumber, avatarurl });

    cookies.set('token', token);
    cookies.set('userId', userId);
    cookies.set('fullname', fullname);
    cookies.set('username', username);

    if (isSignup) {
      cookies.set('hashedPassword', hashedPassword);
      cookies.set('phonenumber', phonenumber);
      cookies.set('avatarurl', avatarurl);
    }

    window.location.reload(); //reload page

  }

  const switchMode = () => {
    setIsSignup((prev) => !prev);
  }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullname">Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">UserName</label>
              <input
                name="username"
                type="text"
                placeholder="UserName"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  name="phonenumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarurl">Avatar URL</label>
                <input
                  name="avatarurl"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button>{isSignup ? 'Sign Up' : 'Sign In'}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"
              }
              <span onClick={switchMode}>
                {isSignup ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </div>

        </div>
      </div >
      <div className="auth__form-container_image">
        <img src={signinImage} alt="signin" />
      </div>
    </div >
  )
}

export default Auth