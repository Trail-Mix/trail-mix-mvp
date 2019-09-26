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
import './loginstyle.css';

// Login component is for updating user information and login information
const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // post request, get the data from user input, then make a post request with the user input to check match with database
  const attemptLogin = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };
    fetch("/login", options)
      .then(res => res.json())
      .then(res => {
        if (res) {
          props.setUsername(username);
          setUsername('');
          setPassword('');
          props.setIsLoggedIn(res);
        }
      })
      .catch(err => console.error(err));
  };

  // if "isLoggedIn" is true, then redirect to the homepage, else if "isLoggedIn" is false, then direct to the login page
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
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <label className="labelpsw"> Password: </label>
          <input
            className="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="loginbtn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              attemptLogin();
            }}
          >
            Login
          </button>
        </form>
        <div className="link">
          <button type="submit" onClick={() => props.setView('signup')}> SIGNUP </button>
        </div>
      </div>
    </div>
  )
};

export default Login;
