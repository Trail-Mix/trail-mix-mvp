/**
 * ************************************
 *
 * @module  TrailDisplay
 * @author
 * @date
 * @description presentation component that renders each trail data
 *
 * ************************************
 */
import React from "react";

//pulls specific data from trailContainer to display in overlay
const TrailDisplay = props => {
    return (
        <div className="trailInfo">
        <img src={props.selectedTrail && props.selectedTrail.imgMedium} id='trailImage'/>
        <p id='trailName'> <strong>{props.selectedTrail && props.selectedTrail.name}</strong><br/>
        {props.selectedTrail && props.selectedTrail.location}</p>
        <p>"{props.selectedTrail && props.selectedTrail.summary}"</p>
        <p> Length: {props.selectedTrail && props.selectedTrail.length}&nbsp;miles</p>
        <p> Difficulty: {props.selectedTrail && props.selectedTrail.difficulty}</p>
        <p> Trail Rating: {props.selectedTrail && props.selectedTrail.stars}&nbsp;stars</p>
        <p> Ascent: {props.selectedTrail && props.selectedTrail.ascent}&nbsp;<br></br>
        Descent: {props.selectedTrail && props.selectedTrail.descent}</p>
        <p> Conditions: {props.selectedTrail && props.selectedTrail.conditionStatus}<br/> 
        ({props.selectedTrail && props.selectedTrail.conditionDate})</p>
        <br/><br/><br/>
    </div>
    );
};

export default TrailDisplay;