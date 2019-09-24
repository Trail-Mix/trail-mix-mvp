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

import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import SvgTrekking from "./Icons/Trekking.js";

//importing ReactMapGl component from react-map-gl module, using react hooks to set local state 
const MapDisplay = props => {
    const [viewport, setViewport] = useState({
       latitude: 34.1053,
       longitude: -118.352,
       width: '70vw',
       height: '70vh',
       zoom: 11
    });
    
    const [selectedHike, setSelectedHike] = useState(null);

    return (
        <div id="map-display">
            <ReactMapGl 
            {...viewport} 
            mapboxApiAccessToken={`pk.eyJ1IjoiZXJlYXN0bWFuIiwiYSI6ImNrMHUyemE4bTBqdmwzYnFnMGk0Z2VzaWgifQ.AL6aKHfOcWqKwC72i3FyBg`}
            mapStyle={`mapbox://styles/ereastman/ck0vjqz9x7y0g1cqs0vq5l9ld`}
            onViewportChange={viewport => setViewport(viewport)}
            >
                {/* map through trailData array in state to produce marker components, as well as popup components, on the map */}
            {props.trailData.map(trail => (
                <Marker 
                key={trail.id}
                latitude={trail.latitude}
                longitude={trail.longitude}
                >
                    <button
                    onClick={e => {
                        e.preventDefault();
                        setSelectedHike(trail);
                        setViewport({
                            latitude: trail.latitude,
                            longitude: trail.longitude,
                            width: '70vw',
                            height: '70vh',
                            zoom: 16
                        });
                    }}
                    >
                        <SvgTrekking width='30px' height='30px' />
                    </button>
                </Marker>
            ))}
            {selectedHike && (
                <Popup
                latitude={selectedHike.latitude}
                longitude={selectedHike.longitude}
                className='popup'
                >
                    <div onClick={() => props.displayTrail(selectedHike)}>
                        <h4 className='popup-name'>{selectedHike.name}</h4>
                        <p className='popup-summary'>{selectedHike.location}</p>
                        <p className='popup-difficulty'>difficulty: {selectedHike.difficulty}</p>
                    </div>
                </Popup>
            )}
            </ReactMapGl>
        </div>
    );
};

export default MapDisplay;