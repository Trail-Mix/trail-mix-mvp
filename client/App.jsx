import React, { Component } from 'react';
import MainContainer from "./containers/MainContainer.jsx";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const googleMapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const googleMaps_API_KEY = 'AIzaSyAgJUQeWjM55IdJbPXVRa3i-5N6uLvptI8';
const hikingProject_API_KEY = '200601261-d71b1d3a8f073c58c93d34bf907171f1'

//state includes data retrieved from REI API, selects selected trail
// holds trail specific comments pulled from database
class App extends Component {
  // user ID
    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            username: null,
            trailData: [],
            selectedTrail: null,
            isLoggedIn: true,
            comments: [],
            searchInput: '',
            latitude: 39.0119,
            longitude: -98.4842,
            zoom: 3,
        }


    this.getTrail = this.getTrail.bind(this);
    this.saveTrail = this.saveTrail.bind(this);
    this.removeTrail = this.removeTrail.bind(this);
    this.displayTrail = this.displayTrail.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

    };
    //fetches data from REI API and sets to state when the page loads

    handleSearchInput(e) {
        let input = e.target.value;
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



    // fetches data from REI API and sets to state when the page loads
    componentDidMount() {

            this.setState({
              userId: this.props.location.state.id,
              username: this.props.location.state.username
            });

            fetch('/data')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
              this.setState(state => {
                  return {
                      ...state,
                      trailData: res.trails
                  };
              });
        });
    };

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

    saveTrail(event, props) {
      event.preventDefault();

      fetch('/trail/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userId: this.state.userId,
              reiId: props.id,
              length: props.length,
              difficulty: props.difficulty,
              location: props.location,
              name: props.name,
          })
      })
      .then((res) => {
          return res.json();
      })
    }

    removeTrail(event, props) {
      event.preventDefault();

      fetch('/trail/remove', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userId: props.userId,
              reiId: props.id,
          })
      })
      .then((res) => {
          return res.json();
      })
    }

    //invoked when clicking on the map popups
    displayTrail(selectedHike) {
        this.setState({selectedTrail: selectedHike});
    }

    //renders MainContainer and conditionally renders TrailContainer
    render() {
        if (!this.state.isLoggedIn) return <Redirect to="/login" />
        return (
          <div>

            <div className="navigation">
              <Link className="nav-item" to="/homepage">Trail Mix</Link>
              <Link className="nav-item" to={{
                pathname: '/favs',
                state: {
                  userId: this.state.userId,
                  username: this.state.username
                }
              }}>My Favs</ Link>
              <p className="nav-item" id="userGreeting">Hello, {this.state.username}!</p>
            </div>

            <div className='appContainer'>
              <div id="searchForm">
                <form onSubmit={this.handleSearchSubmit}>
                  <label>
                  <input
                    type="text"
                    value={this.state.searchLocation}
                    onChange={this.handleSearchInput}
                    placeholder="Search Address"
                  />
                  </label>
                  <input className="submitButton" type="submit" value="Submit" />
                </form>
              </div>
                <MainContainer
                  className='mainContainer'
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  trailData={this.state.trailData}
                  getTrail={this.getTrail}
                  selectedTrail={this.state.selectedTrail}
                  displayTrail={this.displayTrail}
                  zoom={this.state.zoom}
                  saveTrail={this.saveTrail}
                  userId={this.state.userId}
                  username={this.state.username} />
            </div>
          </div>
        );
    };
};


export default App;
