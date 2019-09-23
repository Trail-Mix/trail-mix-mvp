/**
 * ************************************
 *
 * @module  CommentDisplay
 * @author
 * @date
 * @description presentation component that renders each user's comment
 *
 * ************************************
 */
import React from "react";

//display component for comments, pulls down and formats comment array from trailContainer
function CommentsDisplay(props) {
    return (
        <div className="commentsDisplay">
            <div> "{props.comment}"<br/>-{props.author} </div>
            <br/>
        </div>
    );
};

export default CommentsDisplay; 