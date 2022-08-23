import { useJsApiLoader } from "@react-google-maps/api"
import { Autocomplete } from "./Autocomplete";
import { Map, MODES } from "./Map/Map";
import { useCallback, useEffect, useState } from 'react';
import { SpotsList } from "./SpotsList/SpotsList";
const defaulCenter = {
    lat: -3.745,
    lng: -38.523
  };
  
  
  const libraries = ['places'];
export const MapContainer = () => {
    const [center, setCenter] = useState(defaulCenter);
    const [mode, setMode] = useState(MODES.MOVE);
    const [spots, setSpots] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries
      })
      const onPlaceSelect = useCallback(
        (coordinates) => {
          setCenter(coordinates)
        },
        []
      )

      const toggleMode = useCallback(() => {
        switch (mode) {
          case MODES.SET_MARKER:
            setMode(MODES.MOVE);
            break;
          case MODES.MOVE:
            setMode(MODES.SET_MARKER);
            break;
          default: setMode(MODES.MOVE);
        }
      }, [mode])
      const onSpotAdd = (coordinates) => {
        setSpots([...spots, coordinates])
      }


      const [chosenSpot, setChosenSpot] = useState(null);
      const [showChosenSpot, setShowChosenSpot] = useState(false);
      const onSpotClick = (index) => {
        setShowChosenSpot(true);
         setChosenSpot(spots.find(s=>s.index==index));
       
     
 }

 useEffect(() => {
   console.log(chosenSpot);
 }, [chosenSpot])
 /*
 const onClick = useCallback((loc) => {
  if (mode === MODES.SET_MARKER) {
      const lat = loc.latLng.lat();
      const lng = loc.latLng.lng();
      onSpotAdd({lat, lng, text: 'Hello', name: spots.length+1, description: spots.length+1, index: spots.length+1})
  }
}, [mode, onSpotAdd])
*/
    return (
        <div>
            <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
            <button onClick={toggleMode}>Set Markers</button>
            {isLoaded ? <Map mode={mode} center={center} spots={spots} onSpotAdd={onSpotAdd} chosenSpot={chosenSpot} chooseSpotHandler={onSpotClick}/> : 'hello'}
            <SpotsList spots={spots}/>     
        </div>
    )
}