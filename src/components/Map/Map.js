import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useCallback, useRef } from 'react';
import { Spot } from '../Spot/Spot';
import s from './Map.module.css';
import { defaultTheme } from './Theme';
const containerStyle = {
    width: '100%',
    height: '100%'
};

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

export const Map = ({ center, spots, onSpotAdd, chooseSpotHandler, chosenSpot, zoomMapHandler }) => {
    const myRef = useRef(undefined);
    const onLoad = useCallback(function useCallback(map) {
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

    const onZoomChanged = useCallback(function useCallback() {
       if(myRef.current !== undefined){
        let bounds = myRef.current.getBounds();
        console.log(bounds);  
        zoomMapHandler(bounds); 
    }}, [spots])

    const onDrag = useCallback(function useCallback() {
        if(myRef.current !== undefined){
         let bounds = myRef.current.getBounds();
         console.log(bounds);  
         zoomMapHandler(bounds);
     }}, [spots])

    return (
        <div className={s.container}>
            <GoogleMap
                mapContainerClassName={s.map}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onZoomChanged={onZoomChanged}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
                onClick={onClick}
                onDrag={onDrag}
            >
                {spots.map((spot) => {
                    if (chosenSpot && (chosenSpot.id === spot.id)) {
                        return (<Spot spot={spot} iconPath='/chosenSpotIcon.svg' chosenSpot={chosenSpot} key={spot.id} chooseSpotHandler={chooseSpotHandler} />)
                    } else {
                        return (<Spot spot={spot} iconPath='/spotIcon.svg' chosenSpot={chosenSpot} key={spot.id} chooseSpotHandler={chooseSpotHandler} />);
                    }
                })}
            </GoogleMap>
        </div>
    )
}
