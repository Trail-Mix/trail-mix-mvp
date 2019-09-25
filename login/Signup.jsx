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
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./signupstyle.css";

// Signup componenet is for the users to create their login username and password
class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            verified: false,
            userId: null
        };
        this.updateData = this.updateData.bind(this);
    };

    // post request to send user input to database
    updateData() {
        const url = ('/signup');
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    verified: res.verified,
                    userId: res.userId,
                });
            }).catch(err => console.log(err));
    };


    // if the user has already signed up, then it will redirect to the homepage, else it will direct to the signup page
    render() {
        let pages;
        if (this.state.verified) {
            return <Redirect to={{ pathname: '/homepage', state: { id: this.state.userId, username: this.state.username } }} />
        } else {
            pages =
                <div className="signupArea">
                    <div>
                      <img src="https://images.unsplash.com/photo-1500049242364-5f500807cdd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" width="350px"/>
                    </div>
                    <div className="login-container">
                      <div className="login-header">Create An Account</div>
                      <form action="/signup" className="userInfo">
                        <div className="text-field">
                          <input className="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>
                        </div>
                        <div className="text-field">
                          <input className="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>
                        </div>
                        <br />
                          <button className="loginbtn" type="submit" value="createUser" onClick={e => { e.preventDefault(); this.updateData() }}>Sign Up</button>
                      </form>
                    </div>
                </div>
        };
        return <div>{pages}</div>
    };
};

export default Signup;
