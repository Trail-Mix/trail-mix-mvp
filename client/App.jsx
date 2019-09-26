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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');


  //verifies login session
  useEffect(() => {
    fetch('/check')
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.isLoggedIn);
        if (isLoggedIn) setUsername(data.username);
      })
      .catch(err => console.error(err));
  }, []);

  //renders MainContainer and conditionally renders TrailContainer
  return (
    <div className='appContainer'>
      <MainContainer 
        className='mainContainer'
        username={username}
      />
    </div>
  );
};

export default App;
