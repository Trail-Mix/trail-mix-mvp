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
// import CommentsDisplay from "../components/CommentsDisplay.jsx";

//container component for individual TrailDisplay and CommentsDisplay
//maps through comments to pull desired values 
const TrailContainer = (props) => {
  const [comment, setComment] = useState('');
  const [username, setAuthor] = useState('');
  
  const handleClick = (e) => {
    e.preventDefault();
    props.postComment(e.target.id, comment, username);
    setComment('');
    setAuthor('');
  }

  // if (props.comments) {
    // const comments = props.comments.map((cur, idx) => (
    //   <CommentsDisplay
    //     key = {idx}
    //     comment = {cur.comment}
    //     username = {cur.username}
    //     getTrail = {props.getTrail}
    //   />
    // ));
  // }
  
  return (
    <div className='modalGuts'>
      <button onClick={() => props.noTrail()}>close</button>
      <TrailDisplay selectedTrail={props.selectedTrail} />
      <div className="comments">
        {/* {comments} */}
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
          name="username"
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

