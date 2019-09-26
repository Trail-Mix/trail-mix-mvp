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


function getNumber(word) {
  if (word === 'green') return '1';
  if (word === 'greenBlue') return '2';
  if (word === 'blue') return '3';
  if (word === 'blueBlack') return '4';
  if (word === 'black') return '5';
}


//importing ReactMapGl component from react-map-gl module, using react hooks to set local state
const MapDisplay = props => {

    const [viewport, setViewport] = useState({
       latitude: props.latitude,
       longitude: props.longitude,
       width: '40vw',
       height: '80vh',
       zoom: props.zoom
    });

    useEffect(() => {
        setViewport({...viewport, latitude: props.latitude, longitude: props.longitude, zoom: props.zoom})
    }, [props.latitude, props.longitude])

    const [selectedHike, setSelectedHike] = useState(null);

    return (
        <div id="map-display">
            <ReactMapGl
            {...viewport}
                mapboxApiAccessToken={`pk.eyJ1IjoiYnJ5djM4IiwiYSI6ImNrMHlla3hrdTBkZ2czY212NG5ycW5ua24ifQ.0uOuwH6A6PB1d5Urb9v9fQ`}
            mapStyle={`mapbox://styles/bryv38/ck0znwydy05vg1co2elc9p6yl`}
            onViewportChange={viewport => setViewport(viewport)}
            >
                {/* map through trailData array in state to produce marker components, as well as popup components, on the map */}
            {props.trailData.map(trail => (
                <Marker
                key={trail.id}
                latitude={trail.latitude}
                longitude={trail.longitude}
                >
                    <div
                    onClick={e => {
                        e.preventDefault();
                        setSelectedHike(trail);
                        setViewport({
                            latitude: trail.latitude,
                            longitude: trail.longitude,
                            width: '40vw',
                            height: '80vh',
                            zoom: 16
                        });
                    }}
                    >
                    <img src="./../../../assets/MARKER.png" height="30" width="30"></img>
                    </div>
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
                        <p className='popup-difficulty'>Level {getNumber( selectedHike.difficulty)}</p>
                    </div>
                </Popup>
            )}
            </ReactMapGl>
        </div>
    );
};

export default MapDisplay;
