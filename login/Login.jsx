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
                    isLoggedIn: true
                });
            };
        }).catch(err => console.log(err));
    };

    // if "isLoggedIn" is true, then redirect to the homepage, else if "isLoggedIn" is false, then direct to the login page
    render() {
        let pages;
        if (this.state.isLoggedIn) {
            return <Redirect to="/homepage" />
        } else {
            pages =
                <div className="loginArea">

                    <img src="../assets/trail-mix-logo-small.jpg" className="pic"></img>

                    <form className="userInfo" >
                        <label className="labeluser"> Username: </label>
                        <input className="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>
                        <br />
                        <label className="labelpsw"> Password: </label>
                        <input className="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>
                        <button className="loginbtn" type="submit" onClick={e => {
                            e.preventDefault(); this.updateData();
                        }}> Login</button>
                    </form>
                    <div className="link">
                        <Link to="./signup"> SIGNUP </Link>
                    </div>
                </div >
        };
        return (
            <div>{pages}</div>
        );
    };
};

export default Login;

