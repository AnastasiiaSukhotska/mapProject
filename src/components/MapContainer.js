import { useJsApiLoader } from "@react-google-maps/api"
import { Map, MODES } from "./Map/Map";
import { useCallback, useEffect, useState } from 'react';
import { AddNewAdvert } from "./AddNewAdvert/AddNewAdvert";
import { AdvertList } from "./AdvertList/AdvetList";
import { AddNewSpot } from "./AddNewSpot/AddNewSpot";
import { v4 as uuid } from 'uuid';
import style from './MapContainer.module.css';
const defaulCenter = {
  lat: -3.745,
  lng: -38.523
};


const libraries = ['places'];
export const MapContainer = () => {
  const [center, setCenter] = useState(defaulCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [spots, setSpots] = useState([]);
  const [currentAdvetTitleValue, setCurrentAdvetTitleValue] = useState('');
  const [currentAdvetDescriptionValue, setCurrentAdvetDescriptionValue] = useState('');
  const [chosenSpot, setChosenSpot] = useState({});
  const [showChosenSpot, setShowChosenSpot] = useState(false);
  const [newCoordinate, setNewCoordinate] = useState({});
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

  const onNewSpotCoordinateSelect = useCallback(
    (coordinates) => {
      setNewCoordinate(coordinates)
    }, [])

  const onSpotClick = (id) => {
    if (chosenSpot && chosenSpot.id === id) {
      setChosenSpot({});
      setShowChosenSpot(false)
    }
    else {
      setChosenSpot(spots.find(s => s.id == id))
      setShowChosenSpot(true)
    }
  }

  const addNewSpotHandler = () => {
    setSpots([...spots, { id: uuid, name: 'ijoi', lat: newCoordinate.lat, lng: newCoordinate.lng, adverts: [{ title: currentAdvetTitleValue, description: currentAdvetDescriptionValue }] }])
  }

  const addNewAdvertHandler = () => {
    let updatedSpot = spots.find(spot => spot.id === chosenSpot.id);
    updatedSpot = { ...updatedSpot, adverts: [...updatedSpot.adverts, { title: currentAdvetTitleValue, description: currentAdvetDescriptionValue }] }
    let spotsList = spots.map(spot => spot.id === updatedSpot.id ? updatedSpot : spot);
    setSpots(spotsList);
    setChosenSpot({ ...chosenSpot, adverts: [...chosenSpot.adverts, { title: currentAdvetTitleValue, description: currentAdvetDescriptionValue }] })
    setCurrentAdvetDescriptionValue('');
    setCurrentAdvetTitleValue('');
  }

  useEffect(() => {
    console.log(spots);
  }, [spots])

  const updateAdvetTitleHandler = (value) => {
    setCurrentAdvetTitleValue(value);
  }

  const updateAdvetDescriptionHandler = (value) => {
    setCurrentAdvetDescriptionValue(value);

  }


  return (
    <div>
      {showChosenSpot ? <AddNewAdvert spot={chosenSpot} addNewAdvertHandler={addNewAdvertHandler} updateAdvetTitleHandler={updateAdvetTitleHandler} updateAdvetDescriptionHandler={updateAdvetDescriptionHandler} currentAdvetTitleValue={currentAdvetTitleValue} currentAdvetDescriptionValue={currentAdvetDescriptionValue} /> :  <AddNewSpot onSelect={onPlaceSelect} isLoaded={isLoaded} addNewSpotHandler={addNewSpotHandler} onNewSpotCoordinateSelect={onNewSpotCoordinateSelect} updateAdvetTitleHandler={updateAdvetTitleHandler} updateAdvetDescriptionHandler={updateAdvetDescriptionHandler} currentAdvetTitleValue={currentAdvetTitleValue} currentAdvetDescriptionValue={currentAdvetDescriptionValue}/>}
      <button onClick={toggleMode}>Set Markers</button>
      <div className={style.contentContainer}>
      {isLoaded ? <Map mode={mode} center={center} spots={spots} onSpotAdd={onSpotAdd} chosenSpot={chosenSpot} chooseSpotHandler={onSpotClick} /> : 'hello'}
      {<AdvertList spots={spots} chosenSpot={chosenSpot} showChosenSpot={showChosenSpot} />}
      </div>
    </div>
  )
}
