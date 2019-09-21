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
import MainContainer from "./containers/MainContainer.jsx";
import TrailContainer from './containers/TrailContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        trailData: [ 

        ]
    }
    this.getData = this.getData.bind(this);
    }
function getData(url = '/api/data', data = {}) {
    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        this.setState({trailData: res});
    })

}
    render() {
        return (
            <div>
                <MainContainer />
                <TrailContainer trailData={this.trailData}/>
            </div>
        )
    }
}
export default App;