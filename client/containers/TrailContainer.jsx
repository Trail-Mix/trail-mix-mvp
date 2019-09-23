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
import ListDisplay from "../components/ListDisplay.jsx";


class TrailContainer extends Component {
    

    render() {
        
        return (
            <div className='modalGuts'>
                <button onClick={(e) => this.props.noTrail()}>close</button>
                <TrailDisplay selectedTrail={this.props.selectedTrail}/>
                <div className="comments">
                    <CommentsDisplay />
                </div>
                
            </div>
        )
    }
}

export default TrailContainer;

