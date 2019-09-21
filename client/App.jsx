/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import React, { Component } from 'react';
import Containers from "./containers/MainContainer.jsx";

class App extends Component {
    constructor(props) {
        // super(props);
        // this.state = {
        // } MAY NOT NEED IT 
    };
    render() {
        return (
            <div>
                <Containers />
            </div>
        )
    }
}
export default App;