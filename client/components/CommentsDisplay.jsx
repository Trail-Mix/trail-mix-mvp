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
        <div className="comment-display">
            <div className="comment-text">{props.comment}</div>
            <div className="comment-author">{props.author}</div>
        </div>
    );
};

export default CommentsDisplay;
