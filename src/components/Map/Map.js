import {GoogleMap, Marker} from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';
import { Spot } from '../Spot/Spot';
import s from './Map.module.css';
import { defaultTheme } from './Theme';
import {v4 as uuid} from 'uuid';
const containerStyle = {
    width: '800px',
    height: '800px'
  };

 export const MODES = {
    MOVE: 0,
    SET_MARKER: 1
  }
const defaultOptions = {
    panControl: true,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullScreenControll: false,
    styles: defaultTheme
  }
  
  
export const Map = ({center, mode, spots, onSpotAdd, chooseSpotHandler, chosenSpot}) => {
    const myRef = useRef(undefined);
    const onLoad = useCallback(function useCallback(map){
        myRef.current = map;
    }, [])
    const onUnmount = useCallback(function useCallback(map) {
        myRef.current = undefined;
    }, [])
    const onClick = useCallback((loc) => {
        if (mode === MODES.SET_MARKER) {
            const lat = loc.latLng.lat();
            const lng = loc.latLng.lng();
            onSpotAdd({lat, lng, name: spots.length+1, description: spots.length+1, id: uuid(), adverts: [], currentValueAdvertTitle: '', currentValueAdvertDescription: ''})
        }
    }, [mode, onSpotAdd])
    return(
    <div className= {s.container}>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={defaultOptions}
            onClick={onClick}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
            <Marker position={center}/>
          
            {spots.map((pos) => {
                return <Spot position={pos} key={pos.id} onSpotClick={chooseSpotHandler}/>;
            })}
        </GoogleMap>
    </div>
    )}
