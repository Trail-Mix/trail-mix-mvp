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

const CommentsDisplay = props => {

    const comments = props.comments.map(() => {
                
        return (
            <CommentsDisplay 
            comment = {comments.comment}
            author = {comments.author}
            postComment = {this.props.postComment}/>
        )
    })

    return (
        <div className="commentsDisplay">
            <p> {comments.length > 0 && comments} </p>
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
            <button value="Submit" 
            onClick={(c, a) => props.postComment(e.target.comment, e.target.author)}>Submit</button>
            </form>
        
        </div>
    );
};

export default CommentsDisplay; 