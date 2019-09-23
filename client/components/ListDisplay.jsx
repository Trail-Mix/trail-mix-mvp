/**
 * ************************************
 *
 * @module  ListDisplay
 * @author
 * @date
 * @description presentation component that display the trail list
 *
 *
 * ************************************
 */

import React from "react";
import Styles from "../styles.css"



const ListDisplay = props => {
    // console.log('list display', props.getTrail)
    return (
        <div className='list'>
            <div className='column'>
            <p id={props.id} className='namePlace' 
            onClick={(e) => props.getTrail(e.target.id)}>
            {props.trailData.length > 0 && props.name}:&nbsp;
            {props.trailData.length > 0 && props.location}</p>
            </div>
            <div className='column'>
            <p id={props.id} className='length'>
            Length: {props.trailData.length > 0 && props.length} miles</p>
            </div>
            <div className='column'>
            <p id={props.id} className='difficulty'>
            Difficulty: {props.trailData.length > 0 && props.difficulty}</p>
            <br/>
            </div>
        </div>
    );
};

export default ListDisplay;