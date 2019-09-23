/**
 * ************************************
 *
 * @module  signup.js
 * @author
 * @date
 * @description entry point for application.  Hangs React app off of 
 *
 * ************************************
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// import './signupstyles.css';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
        this.updateData = this.updateData.bind(this);
    }

    // post request,get the data from user input, then post the user input to save in the server database 
    updateData() {
        fetch("/api/signup", {
            method: "post",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        }).
            then(res => res.json())
            .then(data => {
                console.log("res.data from signup=> ", data)
                return <Redirect to="/homepage" />
            }).catch(error => console.log(error));
    }


    render() {
        return (
            <form action="/signup" >
                <label> UserName: </label>
                <input name="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>

                <label> Password: </label>
                <input name="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>

                <button type="submit" value="createUser" onClick={e => { e.preventDefault(); this.updateData() }}> SignUp</button>
            </form >


        )
    }
}
export default Signup;
