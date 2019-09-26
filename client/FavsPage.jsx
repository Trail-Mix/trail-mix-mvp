import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button, Table, Row } from 'reactstrap'

class FavsPage extends Component {

constructor(props) {
  super(props);
  this.state = {
    userId: null,
    username: null,
    savedTrails: [],
    hikedTrails: [],
    weather: [],
  }

  this.hikedTrail = this.hikedTrail.bind(this);
  this.getNumber = this.getNumber.bind(this);
}

componentDidMount() {

  const { userId, username, weather } = this.props.location.state;

  this.setState({
    userId,
    username,
    weather
  });

  fetch('/favs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
    })
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
    this.setState(state => {
      return {
        ...state,
        savedTrails: res.trails,
        hikedTrails: res.hiked,
      };
    });
  })
}

getNumber(word) {
  if (word === 'green') return '1';
  if (word === 'greenBlue') return '2';
  if (word === 'blue') return '3';
  if (word === 'blueBlack') return '4';
  if (word === 'black') return '5';
}

hikedTrail(e, trailId) {
  e.preventDefault();

  fetch('/trail/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: this.state.userId,
      trailId: trailId
    })
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
    this.setState(state => {
      return {
        ...state,
        savedTrails: res.trails,
        hikedTrails: res.hiked,
      };
    });
  })
}

render() {

  let weather = 70;
  if (this.state.weather.length !== 0) {
    weather = Math.floor(this.state.weather.data[0].temperatureMin);
  }

  let saved = this.state.savedTrails.map((trail, idx) => {
    console.log(trail)
      return (
        <tr key={trail.id}>
            <td className="trail-name">{trail.name}</td>
            <td>{trail.location}</td>
            <td>{trail.length} miles</td>
            <td>{this.getNumber(trail.difficulty)}</td>
            <td><a href="#" className="trail-page-link" onClick={(e) => this.hikedTrail(e, trail.rei_id)}>Hiked</a></td>
        </tr>
      );
  });


  let hiked = this.state.hikedTrails.map((trail, idx) => {
      return (
        <tr key={trail.id}>
            <td className="trail-name">{trail.name}</td>
            <td>{trail.location}</td>
            <td>{trail.length} miles</td>
            <td>{this.getNumber(trail.difficulty)}</td>
        </tr>
      );
  });

   return (
     <div>
     <div className="navbars">
       <div className="navigation">
         <Link className="nav-item" to={{
           pathname: '/homepage',
           state: {
             id: this.state.userId,
             username: this.state.username,
             weather: this.state.weatherData
           }
         }}><img src="../assets/LOGO.png" width="150"></img></ Link>
         <Link className="nav-item" to="/favs">My Favs</Link>
         <p className="nav-item" id="userGreeting">Hello, {this.state.username}!</p>
       </div>
       <div className="current-weather">Current weather {weather}&#8457;</div>
      </div>

       <div className = "getUserTrails">
       <h2 className="table-name" id="hikedTrails">Hiked Trials</h2>
       <Table size="md" striped>
         <thead>
           <tr>
             <th>Name</th>
             <th>Location</th>
             <th>Length</th>
             <th>Difficulty</th>
           </tr>
         </thead>
         <tbody>
           {hiked}
         </tbody>
       </Table>

       <h2 className="table-name" id="savedTrails">Save Trials</h2>
       <Table size="md" striped>
         <thead>
           <tr>
             <th>Name</th>
             <th>Location</th>
             <th>Length</th>
             <th>Difficulty</th>
             <th></th>
           </tr>
         </thead>
         <tbody>
           {saved}
         </tbody>
       </Table>

       </div>
      </div>
   )
  }
}
export default FavsPage;
