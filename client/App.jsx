/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import MainContainer from "./containers/MainContainer.jsx";
import TrailContainer from './containers/TrailContainer.jsx';
import Login from "./login/Login.jsx";
import Signup from "./login/Signup.jsx";

//state includes data retrieved from REI API, selects selected trail
// holds trail specific comments pulled from database
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState([]);
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
    const options = {
      headers: {
        'Content-Type': 'application/json',
        id,
      },
    };
    fetch('/comments', options)
      .then(res => res.json())
      .then(res => setComments(res))
      .catch(err => console.error(err));
  };

  //invoked when clicking on the map popups
  const displayTrail = (selectedHike) => {
    setSelectedTrail(selectedHike);
  }

  //renders MainContainer and conditionally renders TrailContainer
  return (
    <div className='appContainer'>
      <MainContainer 
        className='mainContainer' 
        trailData={trailData}
        getTrail={getTrail}
        selectedTrail={selectedTrail}
        displayTrail={displayTrail}
        setDiffKey={setDiffKey}
        diffKey={diffKey}
      />
      {selectedTrail
        && <TrailContainer 
          className="modal" 
          trailData={trailData} 
          selectedTrail={selectedTrail}
          setSelectedTrail={setSelectedTrail}
          setComments = {setComments}
          comments={comments}
          getTrail={getTrail}
        />
      }
    </div>
  );
};

export default App;
