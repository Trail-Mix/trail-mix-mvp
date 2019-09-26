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
  
  const handleClick = (e) => {
    e.preventDefault();
    props.postComment(e.target.id, comment, author);
    setComment('');
    setAuthor('');
  }
 
  let comments = []; // this needs to be 'let' for some reason 

  if (props.comments) {
    comments = props.comments.map((cur, idx) => (
      <CommentsDisplay
        key = {idx}
        comment = {cur.comment}
        author = {cur.author}
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
          onChange={e => setComment(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="author"
          id="authorForm"
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

