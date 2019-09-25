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
import FavsPage from './components/FavsPage';

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
          diffKey: false
        }

        this.getTrail = this.getTrail.bind(this);
        this.saveTrail = this.saveTrail.bind(this);
        this.removeTrail = this.removeTrail.bind(this);
        this.displayTrail = this.displayTrail.bind(this);
        this.showKey = this.showKey.bind(this);
    };

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
              userId: props.userId,
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

    //toggle that is invoked when clicking on the "difficulty" in the list items
    showKey() {
        this.setState(state => {
            return {
                diffKey: state.diffKey ? false : true
            }
        });
    };

    // renders MainContainer and conditionally renders TrailContainer
    render() {
        if (!this.state.isLoggedIn) return <Redirect to="/login" />
        return (
            <div className='appContainer'>
                <FavsPage
                className = "getUserTrails"
                savedTrails = {this.state.savedTrails}
                hikedTrails = {this.state.hikedTrails}
                />
                <MainContainer
                  className='mainContainer'
                  trailData={this.state.trailData}
                  getTrail={this.getTrail}
                  selectedTrail={this.state.selectedTrail}
                  displayTrail={this.displayTrail}
                  showKey={this.showKey}
                  diffKey={this.state.diffKey}
                  saveTrail={this.saveTrail}
                  userId={this.state.userId}
                  username={this.state.username}
                />
            </div>
        );
    };
};


export default App;
