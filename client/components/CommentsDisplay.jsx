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

function CommentsDisplay(props) {

    return (
        <div className="commentsDisplay">
            {/* <p>comments are loaded</p> */}
            <div> "{props.comment}"<br/>&nbsp;-{props.author} </div>
            <br/>
        
        </div>
    );
};

export default CommentsDisplay; 