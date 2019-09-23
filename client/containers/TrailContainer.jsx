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
import React, { Component} from "react";
import TrailDisplay from "../components/TrailDisplay.jsx";
import CommentsDisplay from "../components/CommentsDisplay.jsx";

//container component for individual TrailDisplay and CommentsDisplay
//maps through comments to pull desired values 
class TrailContainer extends Component {
    render() {
        let comments = [];
        if (this.props.comments) {
            comments = this.props.comments.map((cur, idx) => {
                return (
                    <CommentsDisplay key = {idx}
                    comment = {cur.comment}
                    author = {cur.author}
                    postComment = {this.props.postComment}
                    getTrail = {this.props.getTrail} />
                );
            });
        };
        return (
            <div className='modalGuts'>
                <button onClick={(e) => this.props.noTrail()}>close</button>
                <TrailDisplay selectedTrail={this.props.selectedTrail}/>
                <div className="comments">
                    {comments}
                </div>
                <div>
                <br/>
                {/* input fields and button to add comments */}
            <input type="text" name="comment" id="commentForm"></input>
            <br/>
            <br/>
            <br/>
            <input type="text" name="author" id="authorForm"></input>
            <br/>
            <br/>
            <button value="Submit" id={this.props.selectedTrail.id} 
            onClick={(e) => {
                const comment = document.getElementById('commentForm').value;
                const author = document.getElementById('authorForm').value;            
                this.props.postComment(e.target.id, comment, author)
                document.getElementById('commentForm').value = '';
                document.getElementById('authorForm').value = '';
            }}>
            Submit</button>
                </div>
            </div>
        );
    };
};

export default TrailContainer;

