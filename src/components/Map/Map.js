import {GoogleMap, Marker} from '@react-google-maps/api';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChosenSpot } from '../ChosenSpot/ChosenSpot';
import { CurrentLocationMarker } from '../CurrentLocationMarker';
import { Spot } from '../Spot/Spot';
import s from './Map.module.css';
import { defaultTheme } from './Theme';
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
    /*
    const [chosenSpot, setChosenSpot] = useState(null);
    const [showChosenSpot, setShowChosenSpot] = useState(false);
    */
    const onLoad = useCallback(function useCallback(map){
        myRef.current = map;
    }, [])
    const onUnmount = useCallback(function useCallback(map) {
        myRef.current = undefined;
    }, [])
/*
    const onSpotClick = (index) => {
           setShowChosenSpot(true);
            setChosenSpot(spots.find(s=>s.index==index));
        
    }

*/
    const onClick = useCallback((loc) => {
        if (mode === MODES.SET_MARKER) {
            const lat = loc.latLng.lat();
            const lng = loc.latLng.lng();
            onSpotAdd({lat, lng, text: 'Hello', name: spots.length+1, description: spots.length+1, index: spots.length+1})
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
                return <Spot position={pos} key={pos.index} onSpotClick={chooseSpotHandler}/>;
            })}
        </GoogleMap>
        
       {/* {showChosenSpot ? <ChosenSpot spot={chosenSpot} /> : 'no selected'} */}
    </div>
    )}
