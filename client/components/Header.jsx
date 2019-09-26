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
  const [searchInput, setSearchInput] = useState(null);

  return (
    <div className="header">
      <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/><br />
      <form>
        
      </form>
    </div>
  )
};

export default Header;