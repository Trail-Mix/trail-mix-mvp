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

import React, { useState, useEffect } from "react";
import MapDisplay from "../components/MapDisplay.jsx";
import ListContainer from "./ListContainer.jsx";
import TrailContainer from './TrailContainer.jsx';

//container that combines MapDisplay and ListContainer and passes down all necessary props
const MainContainer = (props) => {
  const [trailData, setTrailData] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [comments, setComments] = useState([]);
  const [diffKey, setDiffKey] = useState(false);

  //fetches data from REI API and sets to state when the page loads
  useEffect(() => {
    fetch('/data')
      .then(res => res.json())
      .then(res => setTrailData(res.trails))
      .catch(err => console.error(err));
  }, []);

  //invoked by on-click function in TrailDisplay, sets selected trail in state
  const getTrail = (id) => {
    for (let i = 0; i < trailData.length; i += 1) {
      if (trailData[i].id === +id) {
        setSelectedTrail(trailData[i]);
        break;
      }
    }
    fetch(`/comments?trailid=${id}`)
      .then(res => res.json())
      .then(res => {
        console.dir(res);
        setComments(res);
      })
      .catch(err => console.error(err));
  };
  return (
    <div id="main-container">
      <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/><br />
      <MapDisplay
        id="map-display"
        trailData={trailData}
        getTrail={getTrail}
        setSelectedTrail={setSelectedTrail}
      /><br />
      <ListContainer
        setTrailData={setTrailData}
        trailData={trailData}
        getTrail={getTrail}
        setDiffKey={setDiffKey}
        diffKey={diffKey}
      />
      {/* conditional renders difficulty key overlay */}
      {diffKey && (
        <div>
          <img id='diff-key' src='../../assets/diff-key.jpg' />
        </div>
      )}
      {selectedTrail
        && <TrailContainer
          className="modal"
          trailData={trailData}
          selectedTrail={selectedTrail}
          setSelectedTrail={setSelectedTrail}
          setComments = {setComments}
          comments={comments}
          getTrail={getTrail}
          username={props.username}
        />
      }
    </div>
  );
}

export default MainContainer;
