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

import React from "react";
import MapDisplay from "../components/MapDisplay.jsx";
import ListContainer from "./ListContainer.jsx";
import Header from "../components/Header.jsx"

//container that combines MapDisplay and ListContainer and passes down all necessary props
const MainContainer = (props) => (
  <div id="main-container">
    <Header />
    <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/><br />
    <MapDisplay 
      id="map-display"
      trailData={props.trailData}
      getTrail={props.getTrail}
      displayTrail={props.displayTrail} 
    /><br />
    <ListContainer 
      trailData={props.trailData} 
      getTrail={props.getTrail}
      setDiffKey={props.setDiffKey}
      diffKey={props.diffKey}
    />
    {/* conditional renders difficulty key overlay */}
    {props.diffKey && (
      <div>
        <img id='diff-key' src='../../assets/diff-key.jpg' />
      </div>
    )}
  </div>
);

export default MainContainer;
