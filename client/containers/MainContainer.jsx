/**
 * ************************************
 *
 * @module  MainContainer
 * @author  
 * @date
 * @description stateful component that renders MapDisplay and ListContainer
 *
 * ************************************
 */

import React, { Component } from "react";
import MapDisplay from "../components/MapDisplay.jsx";
import ListContainer from "./ListContainer.jsx";

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // show: false
        }

        // showTrail = () => {
        //     this.setState({ show: true });
        //   };
        
        //   hideTrail = () => {
        //     this.setState({ show: false });
        //   };
    }
    
    render() {
        console.log('props.showKey is', this.props.showKey)
        return (
            <div id="main-container">
            {/* <div id="main-container" style={{flex:1, flexDirection:'column', justifyContent:'center'}}> */}
                {/* <h1 className="header">Trail Mix</h1> */}
                <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/><br />
                <MapDisplay 
                id="map-display"
                trailData={this.props.trailData}
                getTrail={this.props.getTrail}
                displayTrail={this.props.displayTrail} 
                /><br />
                <ListContainer 
                trailData={this.props.trailData} 
                getTrail={this.props.getTrail}
                showKey={this.props.showKey}
                diffKey={this.props.diffKey} 
                />
                {this.props.diffKey && (
                    <div>
                        
                        <img id='diff-key' src='../../assets/diff-key.jpg' />
                        {/* <button onClick={() => this.props.showKey(this.props.diffKey)}>close</button> */}
                    </div>
                )}
            </div>
        )
    }
}
export default MainContainer;