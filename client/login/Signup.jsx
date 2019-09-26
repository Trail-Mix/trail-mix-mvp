/**
 * ************************************
 *
 * @module  signup.js
 * @author
 * @date
 * @description entry point for application.
 *
 * ************************************
 */
import React, { useState } from "react";
import "./signupstyle.css";

// Signup componenet is for the users to create their login username and password
const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // post request to send user input to database
  const attemptSignup = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }
    fetch('/signup', options)
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

  // if the user has already signed up, then it will redirect to the homepage, else it will direct to the signup page
  return (
    <div>
      <div className="signupArea">
        <img src="../assets/trail-mix-logo-small.jpg" className="pic" />
        <form action="/signup" className="userInfo" >
          <label className="labeluser"> Username: </label>
          <input
            className="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label className="labelpsw"> Password: </label>
          <input
            className="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <button
            className="loginbtn"
            type="submit"
            value="createUser"
            onClick={e => attemptSignup(e)}
          > SignUp
          </button>
        </form >
        <div className="link">
          <button type="submit" onClick={() => props.setView('login')}> LOGIN </button>
        </div>
      </div>
    </div>
  )
};

export default Signup;
