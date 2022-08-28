import { useJsApiLoader } from "@react-google-maps/api"
import { Map } from "./components/Map/Map";
import { useCallback, useState } from 'react';
import { AddNewAdvert } from "./components/AddNewAdvert/AddNewAdvert";
import { AdvertList } from "./components/AdvertList/AdvetList";
import { AddNewSpot } from "./components/AddNewSpot/AddNewSpot";
import { v4 as uuid } from 'uuid';
import style from './MapContainer.module.css';
import { initialState } from "./initialState";

const defaulCenter = {
  lat: 50.450,
  lng: 30.523
};

const libraries = ['places'];


export const MapContainer = () => {
  const [center, setCenter] = useState(defaulCenter);
  const [spots, setSpots] = useState([]);
  const [currentAdvetTitleValue, setCurrentAdvetTitleValue] = useState('');
  const [currentAdvetDescriptionValue, setCurrentAdvetDescriptionValue] = useState('');
  const [chosenSpot, setChosenSpot] = useState({});
  const [showChosenSpot, setShowChosenSpot] = useState(false);
  const [newCoordinate, setNewCoordinate] = useState({});
  const [error, setError] = useState('');
  const [bounds, setBounds] = useState('');
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBdaxwBJLN90IZFktUxGkLZ2VPWUxUF480',

    libraries
  })
  const onPlaceSelect = useCallback(
    (coordinates) => {
      setCenter(coordinates);
    }, [])



  const onSpotAdd = (lat, lng) => {
    setSpots([...spots, { lat, lng, id: uuid(), adverts: [] }]);
  }

  const onNewSpotCoordinateSelect = useCallback(
    (coordinates) => {
      setNewCoordinate(coordinates);
    }, [])

  const onSpotChooseHandler = (id) => {
    if (chosenSpot && chosenSpot.id === id) {
      setChosenSpot({});
      setShowChosenSpot(false);
    }
    else {
      setChosenSpot(spots.find(s => s.id === id));
      setShowChosenSpot(true);
    }
  }

  const onAddNewSpotHandler = () => {
    if (currentAdvetTitleValue && currentAdvetDescriptionValue && newCoordinate.hasOwnProperty('lng') && newCoordinate.hasOwnProperty('lat')) {
      let id = uuid();
      setSpots([...spots, { id: id, lat: newCoordinate.lat, lng: newCoordinate.lng, adverts: [{ title: currentAdvetTitleValue, description: currentAdvetDescriptionValue, spotId: id, img: '../../../img/room.jpeg' }] }]);
      setCurrentAdvetDescriptionValue('');
      setCurrentAdvetTitleValue('');
      setNewCoordinate({});
      setError('');
    }
    else {
      setError('You need fill each field')
    }
  }

  const onAddNewAdvertHandler = () => {
    if (currentAdvetTitleValue && currentAdvetDescriptionValue) {
      let updatedSpot = spots.find(spot => spot.id === chosenSpot.id);
      updatedSpot = { ...updatedSpot, adverts: [...updatedSpot.adverts, { title: currentAdvetTitleValue, description: currentAdvetDescriptionValue, spotId: updatedSpot.id }] }
      let spotsList = spots.map(spot => spot.id === updatedSpot.id ? updatedSpot : spot);
      setSpots(spotsList);
      setChosenSpot({ ...chosenSpot, adverts: [...chosenSpot.adverts, { title: currentAdvetTitleValue, description: currentAdvetDescriptionValue, spotId: chosenSpot.id, img: '../../../img/room.jpeg' }] })
      setCurrentAdvetDescriptionValue('');
      setCurrentAdvetTitleValue('');
      setError('');
    }
    else {
      setError('You need fill each field')
    }
  }

  const onUpdateAdvetTitleHandler = (value) => {
    setCurrentAdvetTitleValue(value);
  }

  const onUpdateAdvetDescriptionHandler = (value) => {
    setCurrentAdvetDescriptionValue(value);

  }

  const onMoveToChosenAdvertSpotHandler = (id) => {
    onSpotChooseHandler(id);
    let centeredSpot = spots.find(spot => spot.id === id);
    setCenter({ lat: centeredSpot.lat, lng: centeredSpot.lng });
  }

  const onZoomMapHandler = (bounds) => {
    setBounds(bounds);
  }

  const setInitialSpots = () => {
    setSpots(initialState);
  }



  return (
    <div className={style.mainContainer}>
      <div className={style.headerContainer}>
        {showChosenSpot ?
          <AddNewAdvert error={error} spot={chosenSpot} addNewAdvertHandler={onAddNewAdvertHandler} updateAdvetTitleHandler={onUpdateAdvetTitleHandler} updateAdvetDescriptionHandler={onUpdateAdvetDescriptionHandler} currentAdvetTitleValue={currentAdvetTitleValue} currentAdvetDescriptionValue={currentAdvetDescriptionValue} />
          : <AddNewSpot error={error} onSelect={onPlaceSelect} isLoaded={isLoaded} addNewSpotHandler={onAddNewSpotHandler} onNewSpotCoordinateSelect={onNewSpotCoordinateSelect} updateAdvetTitleHandler={onUpdateAdvetTitleHandler} updateAdvetDescriptionHandler={onUpdateAdvetDescriptionHandler} currentAdvetTitleValue={currentAdvetTitleValue} currentAdvetDescriptionValue={currentAdvetDescriptionValue} chosenSpot={chosenSpot} />}
      </div>

      {isLoaded ?
        <Map className={style.mapContainer} setInitialSpots={setInitialSpots} zoomMapHandler={onZoomMapHandler} center={center} spots={spots} onSpotAdd={onSpotAdd} chosenSpot={chosenSpot} chooseSpotHandler={onSpotChooseHandler} />
        : 'hello'}
      {<AdvertList className={style.sidebarContainr} bounds={bounds} moveToChosenAdvertSpotHandler={onMoveToChosenAdvertSpotHandler} spots={spots} chosenSpot={chosenSpot} showChosenSpot={showChosenSpot} />}
    </div>
  )
}
