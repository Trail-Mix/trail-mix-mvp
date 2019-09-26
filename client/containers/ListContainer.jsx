/**
 * ************************************
 *
 * @module  ListContainer
 * @author
 * @date
 * @description stateful component that renders ListDisplay and TrainContainer
 * ************************************
 */
import React, { Component, useState, useEffect } from "react";
import ListDisplay from "../components/ListDisplay.jsx";

//container component that holds the list display of trails
//also maps through trailData array and sets props for desired values
const ListContainer = (props) => {
  const [trailData, setTrailData] = useState(props.trailData);

  useEffect(() => {
    setTrailData(props.trailData);
  }, [props.trailData])

  const sortTrail = () => {
    const trailByName = {};

    props.trailData.forEach((trail) => {
      trailByName[trail.name] = trail;
    })

    const sortedTrails = Object.keys(trailByName).sort();

    const displayInfo = [];
    sortedTrails.forEach(trail => {
      displayInfo.push(trailByName[trail]);
    })

    setTrailData(displayInfo);
  }

  

  const trails = trailData.map((trail, idx) => (
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
      <table>
        <thead>
          <th className='column title' onClick={sortTrail}>
            Trail
          </th>
          <th className='column title'>
            Length
          </th>
          <th className='column title'>
            Difficulty
          </th>
        </thead>
      </table>
      {trails}
    </div >
  );
};

export default ListContainer;
