/**
 * ************************************
 *
 * @module  Login.js
 * @author
 * @date
 * @description entry point for application.  
 *
 * ************************************
 */

import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import './loginstyle.css';

// Login component is for updating user information and login information
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // post request, get the data from user input, then make a post request with the user input to check match with database
  const updateData = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };
    fetch("/login", options)
      .then(res => res.json())
      .then(res => setIsLoggedIn(res))
      .catch(err => console.error(err));
  };

  // if "isLoggedIn" is true, then redirect to the homepage, else if "isLoggedIn" is false, then direct to the login page
  if (isLoggedIn) {
    return <Redirect to="/homepage" />
  }
  return (
    <div>
      <div className="loginArea">
        <img src="../assets/trail-mix-logo-small.jpg" className="pic" />
        <form className="userInfo" >
          <label className="labeluser"> Username: </label>
          <input
            className="username"
            type="text"
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <label className="labelpsw"> Password: </label>
          <input
            className="password"
            type="password"
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="loginbtn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              updateData();
            }}
          >
            Login
          </button>
        </form>
        <div className="link">
          <Link to="./signup"> SIGNUP </Link>
        </div>
      </div>
    </div>
  )
};

export default Login;
