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
        comments: []
    }
    this.getTrail = this.getTrail.bind(this);
    this.noTrail = this.noTrail.bind(this);
    this.postComment = this.postComment.bind(this);
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
        this.setState({selectedTrail: null})
    }

    postComment(comment, author) {
        let commentsArr = this.state.comments.slice();
        
        // commentsArr.push({author: author, comment: comment});
        // this.setState({comments: commentsArr})
    }

    render() {
        // console.log(this.state.selectedTrail)
        if (!this.state.isLoggedIn) return <Redirect to="/login" />
        return (
            <div className='appContainer'>
                <MainContainer className='mainContainer' trailData={this.state.trailData}
                getTrail={this.getTrail}
                selectedTrail={this.state.selectedTrail}/>
                {this.state.selectedTrail &&
                <TrailContainer className="modal" trailData={this.state.trailData} 
                selectedTrail={this.state.selectedTrail} 
                noTrail={this.noTrail}
                postComment={this.postComment}
                comments={this.state.comments} />
                }
                {/* <ListContainer trailData={this.state.trailData} /> */}
            </div>

    )
    }

}


export default App;