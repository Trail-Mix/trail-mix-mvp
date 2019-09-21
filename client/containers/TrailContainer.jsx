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


class TrailContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="trailDisplay">
                <TrailDisplay />
                <div className="comments">
                    <CommentsDisplay />
                </div>
            </div>
        )
    }
}

export default TrailContainer;

