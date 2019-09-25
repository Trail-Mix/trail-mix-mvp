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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


//display component for limited trail info, name clicks through to trail display and difficulty clicks through to difficulty key
const ListDisplay = props => {
    return (
        <div className={props.idx % 2 ? 'odds' : 'evens'}>
            <div className='column'>
              <Link to={{
                pathname: `/trail/${props.id}`,
                state: {
                  username: props.username
                }
              }}>{props.trailData.length > 0 && props.name}:&nbsp;
                {props.trailData.length > 0 && props.location}</ Link>
            </div>
            <div className='column'>
                <p
                  id={props.id}
                  className='length'
                >
                Length: {props.trailData.length > 0 && props.length} miles
                </p>
            </div>
            <div className='column'>
                <p id={props.id} className='difficulty' onClick={() => props.showKey()}>
                Difficulty: {props.trailData.length > 0 && props.difficulty}
                </p>
                <br/>
            </div>
            <div className='column'>
              <p onClick={(e) => props.saveTrail(e, props)}>Like</p>
            </div>
        </div>
    );
};

export default ListDisplay;
