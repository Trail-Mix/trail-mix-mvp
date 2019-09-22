/**
 * ************************************
 *
 * @module  MapDisplay
 * @author
 * @date
 * @description presentation component that display the map
 *
 * ************************************
 */

import React, { useState } from "react";
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
// import * as hikeData from '../../hike-data.js';
import { hikeData } from '../../hike-data.js';
import SvgComponent from "./SvgComponent.jsx";
console.log(hikeData)

const MapDisplay = props => {
    const [viewport, setViewport] = useState({
       latitude: 33.988046,
       longitude: -118.470791,
       width: '90vw',
       height: '90vh',
       zoom: 10
    });
    
    const [selectedHike, setSelectedHike] = useState(null);

    return (
        <div id="map-display">
            <ReactMapGl 
            {...viewport} 
            mapboxApiAccessToken={`pk.eyJ1IjoiZXJlYXN0bWFuIiwiYSI6ImNrMHUyemE4bTBqdmwzYnFnMGk0Z2VzaWgifQ.AL6aKHfOcWqKwC72i3FyBg`}
            mapStyle={`mapbox://styles/ereastman/ck0u3rwwg0j651cquj0hx9rcn`}
            onViewportChange={viewport => setViewport(viewport)}
            >
            {hikeData.map(trail => (
                <Marker 
                key={trail.id}
                latitude={trail.latitude}
                longitude={trail.longitude}
                >
                    {/* <div>Hike</div> */}
                    <button
                    onClick={e => {
                        e.preventDefault();
                        setSelectedHike(trail);
                    }}
                    >
                        {/* <img src='../../assets/trekking.svg' /> */}
                        <SvgComponent />
                    </button>
                </Marker>
            ))}

            {selectedHike && (
                <Popup
                latitude={selectedHike.latitude}
                longitude={selectedHike.longitude}
                onClose={() => setSelectedHike(null)}
                className='popup'
                >
                    <h4 className='popup-name'>{selectedHike.name}</h4>
                    <p className='popup-summary'>{selectedHike.summary}</p>
                    <img 
                    src={`${selectedHike.imgSqSmall}`} 
                    width='40'
                    height='40'
                    alt='Photo of hike'
                    />
                </Popup>
            )}
            </ReactMapGl>
        </div>
    );
};

export default MapDisplay;