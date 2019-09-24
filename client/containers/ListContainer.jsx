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
class ListContainer extends Component {
    render() {
            const trails = this.props.trailData.map((trail, idx) => {
                return (
                    <ListDisplay idx={idx} key={idx}
                    name = {trail.name}
                    location = {trail.location}
                    length = {trail.length}
                    difficulty = {trail.difficulty} 
                    id = {trail.id}
                    trailData = {this.props.trailData}
                    getTrail = {this.props.getTrail}
                    showKey={this.props.showKey}
                    />
                );
            });
            return (
                < div className="listDisplay" >
                    {trails}
                </div >
            );
};
};

export default ListContainer;