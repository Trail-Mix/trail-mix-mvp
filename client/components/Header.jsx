/**
 * ************************************
 *
 * @module  Header
 * @author  
 * @date
 * @description displays logo and search bar
 *
 * ************************************
 */

import React from "react";
import { useState } from "react";

const Header = (props) => {
  const [searchInput, setSearchInput] = useState('');

  const username = 'User'; // can update to match the username of the user

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(searchInput); // NEED TO FIGURE HOW TO STORE DATA
    event.preventDefault();
  };

  const logOut = (event) => {
    console.log('this should log you out');
    // add functionality to log you out
    event.preventDefault();
  }

  return (
    <div className="header">
      <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/><br />
      <p>Hello {username}!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <textarea value={searchInput} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
};

export default Header;