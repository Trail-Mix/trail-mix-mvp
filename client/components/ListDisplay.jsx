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
import { Button, Table, Row } from 'reactstrap'


//display component for limited trail info, name clicks through to trail display and difficulty clicks through to difficulty key
const ListDisplay = props => {
    return (
      <tr key={trail.id}>
          <td>{trail.name}</td>
          <td>{trail.location}</td>
          <td>{trail.difficulty}</td>
          <td>
            <Row>
              <Button>Save</Button>
            </Row>
            <Row>
              <Button>Details</Button>
            </Row>
          </td>
        </tr>
    );
};

export default ListDisplay;
