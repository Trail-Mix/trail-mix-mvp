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
// import * as hikeData from '../../hike-data.js';
// import { hikeData } from '../../hike-data.js';
import SvgTrekking from "./Icons/Trekking.js";

const MapDisplay = props => {
    const [viewport, setViewport] = useState({
       latitude: 33.988046,
       longitude: -118.470791,
       width: '70vw',
       height: '70vh',
       zoom: 10
    });
    
    const [selectedHike, setSelectedHike] = useState(null);

    const [trailArray, setTrailArray] = useState(props.trailData);
    
    useEffect(() => {
        setTrailArray(props.trailData)
    }, [trailArray]);

    // console.log('props.trailData is', props.trailData);
    // console.log('trailArray is', trailArray);
    return (
        <div id="map-display">
            <ReactMapGl 
            {...viewport} 
            mapboxApiAccessToken={`pk.eyJ1IjoiZXJlYXN0bWFuIiwiYSI6ImNrMHUyemE4bTBqdmwzYnFnMGk0Z2VzaWgifQ.AL6aKHfOcWqKwC72i3FyBg`}
            mapStyle={`mapbox://styles/ereastman/ck0u3h0xj6mvw1co2zldwc1lf`}
            onViewportChange={viewport => setViewport(viewport)}
            >
            {props.trailData.map(trail => (
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
                        <SvgTrekking width='30px' height='30px' />
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