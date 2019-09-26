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

  const sortByTrail = () => {
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
  };

  const sortByLength = () => {
    const trailsByLength = {};

    let lengths = props.trailData.map(trail => {
      if (trailsByLength[trail.length]) {
        trailByLength.push(trail);
      } else {
        trailsByLength[trail.length] = [trail];
      }

      return trail.length;
    });

    const sortedLengths = sortNumbers(lengths);

    let displayInfo = [];
    sortedLengths.forEach(length => {
      displayInfo = displayInfo.concat(trailsByLength[length]);
    })

    setTrailData(displayInfo);
  };

  const sortNumbers = (nums) => {
    const middle_i = Math.floor(nums.length / 2);
    let left = nums.slice(0, middle_i);
    let right = nums.slice(middle_i, nums.length);

    if (left.length > 1) left = sortNumbers(left);
    if (right.length > 1) right = sortNumbers(right);

    return merge(left, right)
  };

  const merge = (left, right) => {
    const merged = [];

    while(left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        merged.push(left.shift());
      } else {
        merged.push(right.shift());
      }
    }

    return merged.concat(left).concat(right);
  };

  const sortByDifficulty = () => {
    const trailByDifficulty = {
      'green': [],
      'greenBlue': [],
      'blue': [],
      'blueBlack': [],
      'black': []
    };

    props.trailData.forEach(trail => {
      trailByDifficulty[trail.difficulty].push(trail);
    });


    let displayInfo = [];
    for (let difficulty in trailByDifficulty) {
      displayInfo = displayInfo.concat(trailByDifficulty[difficulty]);
    }

    setTrailData(displayInfo);
  };



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
          <th className='column title' onClick={sortByTrail}>
            Trail
          </th>
          <th className='column title' onClick={sortByLength}>
            Length
          </th>
          <th className='column title' onClick={sortByDifficulty}>
            Difficulty
          </th>
        </thead>
      </table>
      {trails}
    </div >
  );
};

export default ListContainer;
