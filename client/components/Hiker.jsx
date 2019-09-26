/**
 * ************************************
 *
 * @module  Hiker
 * @author
 * @date
 * @description presentation component that displays a hiker's username
 *
 * ************************************
 */
import React from "react";

//display component for comments, pulls down and formats comment array from trailContainer
function Hiker(props) {
  return (
    <div className="hiker-username">{props.username}</div>
  )
};

export default Hiker;
