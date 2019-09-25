import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Hiker from './components/Hiker.jsx';
import CommentsDisplay from "./components/CommentsDisplay.jsx";


class TrailPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trail: [],
      hikers: [],
      comments: [],
      username: 'admin',
    }

    this.postComment = this.postComment.bind(this);
  }

  componentDidMount () {

    const { id } = this.props.match.params;
    const { username } = this.props.location.state

    this.setState({
      username,
      id,
    })

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
                trail: res.trail.trails[0],
                comments: res.comments
            };
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

  render() {

    const { id, name, url, stars, summary, location, length, difficulty, imgMedium, high } = this.state.trail;

    const { username, comments, hikers } = this.state;

    let allComments;
    let allHikers;

    if (comments.length !== 0) {

      allComments = comments.map((x, index) => {
          return <CommentsDisplay key={index} comment={x.comment} author={x.author} />
      })
    }

    if (hikers.length !== 0) {
      allHikers = hikers.map((x, index) => {
          return <Hiker key={index} username={x.username} />
      })
    }

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
        <div>{ allHikers }</div>
        <div>{ allComments }</div>
        <div>
          <input type="text" name="comment" id="commentForm"></input>
          <button
            value="Submit"
            id={id}
            onClick={(e) => {
              const comment = document.getElementById('commentForm').value;
              this.postComment(e.target.id, comment, username)
              document.getElementById('commentForm').value = '';
          }}>Submit</button>
        </div>
      </div>
    )
  }
}

export default TrailPage
