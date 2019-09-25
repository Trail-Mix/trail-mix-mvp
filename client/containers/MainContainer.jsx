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

//container that combines MapDisplay and ListContainer and passes down all necessary props
class MainContainer extends Component {

    render() {
        return (
            <div id="main-container">
                <MapDisplay
                  id="map-display"
                  trailData={this.props.trailData}
                  getTrail={this.props.getTrail}
                  displayTrail={this.props.displayTrail}
                  latitude={this.props.latitude}
                  longitude={this.props.longitude}
                  zoom={this.props.zoom}
                />
                <ListContainer
                  trailData={this.props.trailData}
                  getTrail={this.props.getTrail}
                  showKey={this.props.showKey}
                  saveTrail={this.props.saveTrail}
                  userId={this.props.userId}
                  username={this.props.username}
                />
            </div>
        );
    };
};

export default MainContainer;
