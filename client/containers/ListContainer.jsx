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
                      }}>{trail.name}</ Link></td>
                      <td>{trail.location}</td>
                      <td>{trail.difficulty}</td>
                      <td>
                        <Row>
                          <Button onClick={(e) => this.props.saveTrail(e, trail)}>Like</Button>
                        </Row>
                      </td>
                    </tr>
                );
            });
            return (
              <Table size="lg" striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trails}
                </tbody>
              </Table>
            );
   };
};

export default ListContainer;
