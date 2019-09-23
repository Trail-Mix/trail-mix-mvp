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
            verified: false
        }
        this.updateData = this.updateData.bind(this);
    }

    // post request,get the data from user input, then post the user input to save in the server database 
    updateData() {
        // console.log(this.state.username);
        const url = ('/signup');
        const data = {
            username: this.state.username,
            password: this.state.password
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    verified: res
                })
            })
    }

    // catch (error) {
    //     console.log('error :', error)
    // }
    render() {
        let pages
        if (this.state.verified) {
            return <Redirect to="/homepage" />
        } else {
            pages =
                <div>
                    <form action="/signup" >
                        <label> UserName: </label>
                        <input name="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>

                        <label> Password: </label>
                        <input name="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>


                        <button type="submit" value="createUser" onClick={e => { e.preventDefault(); this.updateData() }}> SignUp </button>
                    </form >
                </div>

        }
        return <div>{pages}</div>
    }

}
export default Signup;
