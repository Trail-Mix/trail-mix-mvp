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
        console.log('these are the comments', this.state.comments)
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
        // console.log(id)
        fetch('/comments', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                id: id
            }
        })
        .then((res) => {
            // console.log('res.json is:', res)
            return res.json();
        })
        .then((res) => {
            // console.log('inside the request', res)
            this.setState(state => {
                return {
                    ...state,
                    comments: res
                }
            })
        })
        .then((res) => {
            document.getElementById('commentForm').value = '';
            document.getElementById('authorForm').value = '';
        })
    }

    noTrail() {
        this.setState({selectedTrail: null})
    }

    postComment(id, comment, author) {
        // console.log('from the button', id, comment, author)
        fetch('/comments', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                comment: comment,
                author: author
            })
        })
        .then((res) => {
            console.log('res.json is:', res.headers)
            return res.json();
        })
        .then((res) => {
            // console.log('inside the request', res)
            this.setState(state => {
                return {
                    ...state,
                    comments: res
                }
            })
        })
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
                comments={this.state.comments}
                getTrail={this.getTrail} />
                }
                {/* <ListContainer trailData={this.state.trailData} /> */}
            </div>

    )
    }

}


export default App;