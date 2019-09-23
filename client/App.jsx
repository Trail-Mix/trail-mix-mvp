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
import ListDisplay from './components/ListDisplay.jsx';
import ListContainer from './containers/ListContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trailData: [],
            selectedTrail: null,
            isLoggedIn: true,
            diffKey: false
        }
    this.getTrail = this.getTrail.bind(this);
    this.noTrail = this.noTrail.bind(this);
    this.displayTrail = this.displayTrail.bind(this);
    this.showKey = this.showKey.bind(this);
    };

    

    componentDidMount() {
            fetch('/data')
            .then((res) => {
                // console.log('res.json is:', res.json())
                return res.json();
            })
            .then((res) => {
                // console.log('res for state:', res.trails)
                this.setState(state => {
                    return {
                        ...state,
                        trailData: res.trails
                    }
                })
    })

}

    getTrail(id) {
        console.log(id);
        console.log('getTrail is called')
        let trailsArr = this.state.trailData.slice();
        let chosenTrail;
        // console.log(id)
        for (let i = 0; i < trailsArr.length; i++) {
            // console.log('these are ids', typeof trailsArr[i].id, typeof id);
            if (trailsArr[i].id === +id) {
                // console.log('The selected trail is', trailsArr[i])
                chosenTrail = trailsArr[i];
                this.setState({selectedTrail: chosenTrail})
            }
        }

    }

    noTrail() {
        console.log('noTrail is invoked')
        this.setState({selectedTrail: null})
    }

    displayTrail(selectedHike) {
        this.setState({selectedTrail: selectedHike});
    }

    showKey() {
        console.log('showKey is called', this.state.showKey)
        this.setState(state => {
            return {
                diffKey: state.diffKey ? false : true
            }
        });
    }

    render() {
        // console.log(this.state.selectedTrail)
        if (!this.state.isLoggedIn) return <Redirect to="/login" />
        return (
            <div className='appContainer'>
                <MainContainer 
                className='mainContainer' 
                trailData={this.state.trailData}
                getTrail={this.getTrail}
                selectedTrail={this.state.selectedTrail}
                displayTrail={this.displayTrail}
                showKey={this.showKey}
                diffKey={this.state.diffKey}
                />
                {this.state.selectedTrail &&
                <TrailContainer 
                className="modal" 
                trailData={this.state.trailData} 
                selectedTrail={this.state.selectedTrail} 
                noTrail={this.noTrail} 
                />}
                {/* <ListContainer trailData={this.state.trailData} /> */}
                {/* {this.state.showKey && 
                    <img id='diff-key' src='../assets.diffKey.png' />
                } */}
            </div>

    )
    }

}


export default App;