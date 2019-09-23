/**
 * ************************************
 *
 * @module  Login.js
 * @author
 * @date
 * @description entry point for application.  Hangs React app off of 
 *
 * ************************************
 */

import React, { Component } from "react";
import App from "../client/App.jsx";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import './loginstyle.css';


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

    // post request,get the data from user input, then post the user input to check with the server database 
    updateData() {
        // console.log(this.state.username)
        fetch("/login", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        }).
            then(res => res.json())
            .then(res => {
                if (res) {
                    this.setState({
                        isLoggedIn: true
                    })
                    console.log(this.state)
                }
            })
    }


    render() {
        let pages
        if (this.state.isLoggedIn) {
            return <Redirect to="/homepage" />
        } else {
            pages =
                <div className="login">
                    <h2>Welcome</h2>
                    <form action="/login">
                        <label> UserName: </label>
                        <input className="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>
                        <label> Password: </label>
                        <input className="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>
                        <button type="submit" onClick={e => {
                            e.preventDefault(); this.updateData();
                        }}> Login</button>
                    </form>
                    <Link to="./signup"> SIGNUP </Link>

                </div >
        }
        return (
            <div>{pages}</div>
        )

    }
}
export default Login;

