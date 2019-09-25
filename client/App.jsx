import React, { Component } from 'react';
import MainContainer from "./containers/MainContainer.jsx";
import TrailContainer from './containers/TrailContainer.jsx';

const googleMapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const googleMaps_API_KEY = 'AIzaSyAgJUQeWjM55IdJbPXVRa3i-5N6uLvptI8';

const hikingProject_API_KEY = '200601261-d71b1d3a8f073c58c93d34bf907171f1'

//state includes data retrieved from REI API, selects selected trail
// holds trail specific comments pulled from database
class App extends Component {
    constructor(props) {
        super(props);
            this.state = {
              trailData: [],
              selectedTrail: null,
              isLoggedIn: true,
              comments: [], 
              // diffKey: false,
              searchInput: '',
                latitude: 39.0119,
                longitude: -98.4842,
                zoom: 3,
    }
    this.getTrail = this.getTrail.bind(this);
    this.noTrail = this.noTrail.bind(this);
    this.postComment = this.postComment.bind(this);
    this.displayTrail = this.displayTrail.bind(this);
    // this.showKey = this.showKey.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    };
    //fetches data from REI API and sets to state when the page loads
//     componentDidMount() {
//             fetch('/data')
//             .then((res) => {
//                 return res.json();
//             })
//             .then((res) => {
//                 console.log(res)
//                 this.setState(state => {
//                     return {
//                         ...state,
//                         trailData: res.trails
//                     };
//                 });
//     });
// };

handleSearchInput(e) {
    let input = e.target.value;
    // console.log(input)
    input = input.replace(' ', '+')
    this.setState({ searchInput: input })
}

handleSearchSubmit(e) {
    e.preventDefault()
    console.log('this.state.searchInput is: ', this.state.searchInput)
    const gUrl = googleMapsUrl + this.state.searchInput + '&key=' + googleMaps_API_KEY;
    console.log(gUrl);
    fetch(gUrl)
    .then((res) => res.json())
    .then((res) => {
        const lat = res.results[0].geometry.location.lat;
        const lng = res.results[0].geometry.location.lng;
        this.setState({ latitude: lat, longitude: lng })
        console.log('latitude is: ', lat)
        console.log('longitude is: ', lng)
    }) 
    .then((res) => {    
        const hUrl = `https://www.hikingproject.com/data/get-trails?lat=${this.state.latitude}&lon=${this.state.longitude}&maxDistance=20&maxResults=100$minStars=3&key=${hikingProject_API_KEY}`
        console.log('hUrl is: ', hUrl);
        fetch(hUrl)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            // this.setState({ trailData: res.trails })
            this.setState(state => {
                return {
                    ...state,
                    trailData: res.trails
                }
            })
            console.log('this.state.trailData is: ', this.state.trailData)
            })
    })
    this.setState({zoom: 10})
}
    //invoked by on-click function in TrailDisplay, sets selected trail in state
    getTrail(id) {
        let trailsArr = this.state.trailData.slice();
        let chosenTrail;
        for (let i = 0; i < trailsArr.length; i++) {
            if (trailsArr[i].id === +id) {
                chosenTrail = trailsArr[i];
                this.setState({selectedTrail: chosenTrail})
            };
        };

        fetch('/comments', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                id: id
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            this.setState(state => {
                return {
                    ...state,
                    comments: res
                };
            });
        });
    };
    //closes TrailDisplay overlay
    noTrail() {
        this.setState({selectedTrail: null})
    }
    //adds comment and author to database and pulls back all comments for specified trail and sets to state
    postComment(id, comment, author) {
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
            return res.json();
        })
        .then((res) => {
            this.setState(state => {
                return {
                    ...state,
                    comments: res
                };
            });
        });
    };
    //invoked when clicking on the map popups
    displayTrail(selectedHike) {
        this.setState({selectedTrail: selectedHike});
    }
    //toggle that is invoked when clicking on the "difficulty" in the list items
    // showKey() {
    //     this.setState(state => {
    //         return {
    //             diffKey: state.diffKey ? false : true
    //         }
    //     });
    // };
    //renders MainContainer and conditionally renders TrailContainer
    render() {
        if (!this.state.isLoggedIn) return <Redirect to="/login" />
        return (
            <div className='appContainer'>
            <form onSubmit={this.handleSearchSubmit}>
            <label>
            Search Address:
            <input type="text" value={this.state.searchLocation} onChange={this.handleSearchInput} />
            </label>
            <input type="submit" value="Submit" />
            </form>
                <MainContainer 
                className='mainContainer' 
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                trailData={this.state.trailData}
                getTrail={this.getTrail}
                selectedTrail={this.state.selectedTrail}
                displayTrail={this.displayTrail}
                zoom={this.state.zoom}
                // showKey={this.showKey}
                // diffKey={this.state.diffKey}
                />
                {this.state.selectedTrail &&
                <TrailContainer 
                className="modal" 
                trailData={this.state.trailData} 
                selectedTrail={this.state.selectedTrail} 
                noTrail={this.noTrail}
                postComment={this.postComment}
                comments={this.state.comments}
                getTrail={this.getTrail} />
                }
            </div>
    );
    };
};


export default App;