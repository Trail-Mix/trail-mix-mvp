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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ListDisplay from "../components/ListDisplay.jsx";
import { Button, Table, Row } from 'reactstrap'

//container component that holds the list display of trails
//also maps through trailData array and sets props for desired values
class ListContainer extends Component {
  constructor(props) {
      super(props);

  this.getNumber = this.getNumber.bind(this);

  };

    getNumber(word) {
      if (word === 'green') return '1';
      if (word === 'greenBlue') return '2';
      if (word === 'blue') return '3';
      if (word === 'blueBlack') return '4';
      if (word === 'black') return '5';
    }

    render() {

            const trails = this.props.trailData.map((trail, idx) => {
                return (
                  <tr key={trail.id}>
                      <td><Link to={{
                        pathname: `/trail/${trail.id}`,
                        state: {
                          username: this.props.username,
                          userId: this.props.userId
                        }
                      }} className="trail-page-link">{trail.name}</ Link></td>
                      <td>{trail.location}</td>
                      <td>{this.getNumber(trail.difficulty)}</td>
                      <td className="heart-space">
                        <p onClick={(e) => this.props.saveTrail(e, trail)}><i className="far fa-lg fa-heart"></i></p>
                      </td>
                    </tr>
                );
            });
            return (
              <Table size="lg" id="allTrails">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Level</th>
                    <th className="heart-space"></th>
                  </tr>
                </thead>
                <tbody className="allTrails">
                  {trails}
                </tbody>
              </Table>
            );
   };
};

export default ListContainer;
