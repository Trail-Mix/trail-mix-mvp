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

const CommentDisplay = props => {

    return (
        <div className="commentDisplay">
            <p>comments: </p>
            <br/>
          
            <form action="/action_page.php" name="comments">
            Comment: 
            <br/>
            <input type="text" name="comment" id="commentForm"></input>
            <br/>
            <br/>
            Author: 
            <br/>
            <input type="text" name="author" id="authorForm"></input>
            <br/>
            <br/>
            <input type="submit" value="Submit"></input>
            </form>
        
        </div>
    );
};

export default CommentDisplay; 