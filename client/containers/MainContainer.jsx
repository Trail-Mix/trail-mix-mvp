/**
 * ************************************
 *
 * @module  MainContainer
 * @author  
 * @date
 * @description stateful component that renders MapDisplay and ListContainer
 *
 * ************************************
 */

import React, { Component } from "react";
import MapDisplay from "../components/MapDisplay.jsx";
import ListContainer from "./ListContainer.jsx";

class MainContainer extends Component {
    render() {
        
        return (
            <div id="main-container">
                <h1 className="header">Main Container</h1>
                {/* <MapDisplay /> */}
                <ListContainer trailData={this.props.trailData}/>
            </div>
        )
    }
}
export default MainContainer;