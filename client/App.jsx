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
import Login from "./login/Login.jsx";
import Signup from "./login/Signup.jsx";

//state includes data retrieved from REI API, selects selected trail
// holds trail specific comments pulled from database
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [view, setView] = useState('login');

  //verifies login session
  useEffect(() => {
    fetch('/check')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsLoggedIn(data.isLoggedIn);
        if (isLoggedIn) setUsername(data.username);
      })
      .catch(err => console.error(err));
  }, []);

  //renders MainContainer and conditionally renders TrailContainer
  return (
    <div className='appContainer'>
      {isLoggedIn
        && <MainContainer 
          className='mainContainer'
          username={username}
        />
      }
      {(view === 'login') && !isLoggedIn
        && <Login
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setView={setView}
        />
      }
      {(view === 'signup') && !isLoggedIn
        && <Signup
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setView={setView}
        />
      }
    </div>
  );
};

export default App;
