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

class MapContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="mainContainer">
                <h1 id="header"> Trail-Mix-Together </h1>
                <div><MapDisplay /></div>
                <div><ListContainer /></div>
            </div>
        )
    }
}
export default MainContainer;