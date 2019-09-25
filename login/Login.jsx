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

import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import './loginstyle.css';

// Login component is for updating user information and login information
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            username: "",
            password: "",
            userId: null,
        }
        this.updateData = this.updateData.bind(this);
    }

    // post request, get the data from user input, then make a post request with the user input to check match with database
    updateData() {
        fetch("/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        })
        .then(res => res.json())
        .then(res => {
            if (res) {
                this.setState({
                  isLoggedIn: true,
                  userId: res.userId,
                });
            };
        }).catch(err => console.log(err));
    };

    // if "isLoggedIn" is true, then redirect to the homepage, else if "isLoggedIn" is false, then direct to the login page
    render() {
        let pages;
        if (this.state.isLoggedIn) {
            return <Redirect to={{ pathname: '/homepage', state: { id: this.state.userId, username: this.state.username } }} />
        } else {
            pages =
                <div className="loginArea">
                    <div>
                      <img src="https://images.unsplash.com/photo-1500049242364-5f500807cdd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" width="350px"/>
                    </div>
                    <div className="login-container">
                      <div className="login-header">Account Login</div>
                      <form className="userInfo">
                        <div className="text-field">
                          <input className="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>
                        </div>
                        <div className="text-field">
                          <input className="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>
                        </div>
                        <br />
                        <button className="loginbtn" type="submit" onClick={e => {
                            e.preventDefault(); this.updateData();
                        }}>Sign In</button>
                      </form>
                      <div className="sign-up-link">
                          <Link to="./signup">Sign Up</Link>
                      </div>
                    </div>
                </div >
        };
        return (
            <div>{pages}</div>
        );
    };
};

export default Login;
