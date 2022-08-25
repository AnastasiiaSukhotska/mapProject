import {GoogleMap, Marker} from '@react-google-maps/api';
import React, { useCallback, useRef } from 'react';
import { Spot } from '../Spot/Spot';
import s from './Map.module.css';
import { defaultTheme } from './Theme';
const containerStyle = {
    width: '100%',
    height: '100%'
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
  
  
export const Map = ({center, spots, onSpotAdd, chooseSpotHandler}) => {
    const myRef = useRef(undefined);
    const onLoad = useCallback(function useCallback(map){
        myRef.current = map;
    }, [])
    const onUnmount = useCallback(function useCallback(map) {
        myRef.current = undefined;
    }, [])
    const onClick = useCallback((loc) => {
            const lat = loc.latLng.lat();
            const lng = loc.latLng.lng();
            onSpotAdd(lat, lng)    
    }, [onSpotAdd])
    return(
    <div className= {s.container}>
        <GoogleMap
            mapContainerClassName={s.map}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={defaultOptions}
            onClick={onClick}
        >
            <Marker position={center}/>
            {spots.map((spot) => {
                return <Spot spot={spot} key={spot.id} chooseSpotHandler={chooseSpotHandler}/>;
            })}
        </GoogleMap>
    </div>
    )}
