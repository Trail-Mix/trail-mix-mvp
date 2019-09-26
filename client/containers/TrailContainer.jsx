/**
 * ************************************
 *
 * @module  TrailContainer.jsx
 * @author
 * @date
 * @description presentation component that displays the TrailDisplay and 
 * CommentsDisplay
 * ************************************
 */
import React, { useState } from "react";
import TrailDisplay from "../components/TrailDisplay.jsx";
import CommentsDisplay from "../components/CommentsDisplay.jsx";

//container component for individual TrailDisplay and CommentsDisplay
//maps through comments to pull desired values 
const TrailContainer = (props) => {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  
  //adds comment and author to database and pulls back all comments for specified trail and sets to state
  const postComment = ( comment, trailid) => {
    console.log("com",comment,"um",trailid)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trailid: props.selectedTrail.id,
        comment,
      })
    };
    fetch('/comments', options)
      .then(res => res.json())
      .then(res => {
        console.log("POST RES", res)
        setComment(res) 
      })
      .catch(err => console.error(err));
  };
  const handleClick = (e) => {
    e.preventDefault();
    postComment( comment,props.selectedTrail.id );
    setComment('');
    setAuthor('');
  }
  let comments; //this needs to be let
  
  if (props.comments) {
    comments = props.comments.map((cur, idx) => (
      <CommentsDisplay
        key = {idx}
        comment = {cur.comment}
        trailId = {cur.trailId}
        getTrail = {props.getTrail}
      />
    ));
  }
  
  return (
    <div className='modalGuts'>
      <button onClick={() => props.setSelectedTrail(null)}>close</button>
      <TrailDisplay selectedTrail={props.selectedTrail} />
      <div className="comments">
        {comments}
        
      </div>
      <form className="commentInput">
        <input
          type="text"
          name="comment"
          id="commentForm"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="username"
          id="authorForm"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <button
          value="Submit"
          id={props.selectedTrail.id}
          onClick={(e) => handleClick(e)}
        >Submit</button>
      </form>
    </div>
  );
};

export default TrailContainer;

