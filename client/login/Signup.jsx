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
import { Redirect } from "react-router-dom";
import "./signupstyle.css";

// Signup componenet is for the users to create their login username and password
class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            verified: false
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
                    verified: res
                });
            }).catch(err => console.log(err));
    };


    // if the user has already signed up, then it will redirect to the homepage, else it will direct to the signup page
    render() {
        let pages;
        if (this.state.verified) {
            return <Redirect to="/homepage" />
        } else {
            pages =
                <div className="signupArea">
                    <img src="../assets/trail-mix-logo-small.jpg" className="pic"></img>
                    <h2 className="welcome">Create Trail Mix Account</h2>

                    <form action="/signup" className="userInfo" >
                        <label className="labeluser"> Username: </label>
                        <input className="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>
                        <label className="labelpsw"> Password: </label>
                        <input className="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>
                        <button className="loginbtn" type="submit" value="createUser" onClick={e => { e.preventDefault(); this.updateData() }}> SignUp </button>
                    </form >
                </div>
        };
        return <div>{pages}</div>
    };
};

export default Signup;
