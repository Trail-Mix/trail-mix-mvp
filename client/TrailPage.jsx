import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Hiker from './components/Hiker.jsx';

class TrailPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trail: [],
      hikers: [],
    }
  }

  componentDidMount () {

    const { id } = this.props.match.params;

    fetch('/trail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trailId: id,
        })
      })
      .then((res) => {
          return res.json();
      })
      .then((res) => {
        this.setState(state => {
            return {
                ...state,
                trail: res.trails[0]
            }
        });
      })

      fetch('/hikers', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              trailId: id,
          })
        })
        .then((res) => {
            return res.json();
        })
        .then((hikers) => {
          this.setState(state => {
              return {
                  ...state,
                  hikers: hikers,
              };
          });
        })
  };

  render() {

    const { id, name, url, stars, summary, location, length, difficulty, imgMedium, high } = this.state.trail;

    const hikers = this.state.hikers.map((x, index) => {
        return <Hiker key={index} username={x.username} />
    })

    return (
      <div>
        Trail Page
        <p>{name}</p>
        <p>{url}</p>
        <p>{stars}</p>
        <p>{summary}</p>
        <p>{location}</p>
        <p>{length}</p>
        <p>{difficulty}</p>
        <img src={imgMedium} />
        <div>{ hikers }</div>
      </div>
    )
  }
}

export default TrailPage
