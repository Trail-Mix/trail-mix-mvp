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
        
        return (
            <div id="main-container" style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                {/* <h1 className="header">Trail Mix</h1> */}
                <img src="../../assets/trail-mix-logo-small.jpg" className='logo'/>
                <MapDisplay trailData={this.props.trailData} id="map-display"/>
                <ListContainer trailData={this.props.trailData} 
                getTrail={this.props.getTrail}/>
            </div>
        )
    }
}
export default MainContainer;