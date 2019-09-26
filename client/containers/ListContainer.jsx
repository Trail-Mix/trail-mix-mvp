/**
 * ************************************
 *
 * @module  ListContainer
 * @author
 * @date
 * @description stateful component that renders ListDisplay and TrainContainer
 * ************************************
 */
import React, { Component } from "react";
import ListDisplay from "../components/ListDisplay.jsx";

//container component that holds the list display of trails
//also maps through trailData array and sets props for desired values
const ListContainer = (props) => {
  const trails = props.trailData.map((trail, idx) => (
    <ListDisplay
      key={trail.id}
      idx={idx}
      name = {trail.name}
      location = {trail.location}
      length = {trail.length}
      difficulty = {trail.difficulty} 
      id = {trail.id}
      trailData = {props.trailData}
      getTrail = {props.getTrail}
      setDiffKey = {props.setDiffKey}
      diffKey = {props.diffKey}
    />
  ));
  return (
    <div className="listDisplay" >
      {trails}
    </div >
  );
};

export default ListContainer;
