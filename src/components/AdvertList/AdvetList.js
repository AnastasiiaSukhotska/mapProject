import { useMemo } from "react";
import { AdvertItem } from "./AdvertItem/AdvertItem";
import style from './AdvertList.module.css';
export const AdvertList = ({ spots, chosenSpot, showChosenSpot, moveToChosenAdvertSpotHandler, bounds }) => {
    const advertItemMapper = (advert) => (<AdvertItem advert={advert} key={advert.title} moveToChosenAdvertSpotHandler={moveToChosenAdvertSpotHandler} />);
    const showAllSpotsAdverts = useMemo(() =>{
        if (bounds) {
            console.log(spots.filter(s=> bounds.contains({lat: s.lat, lng: s.lng})));
          return  spots.filter(s=> bounds.contains({lat: s.lat, lng: s.lng})).flatMap(spot =>  spot.adverts).map(advertItemMapper)

        }
        else {
          return  spots.flatMap(spot =>  spot.adverts).map(advertItemMapper)
        }
    } , [spots, bounds]);
 
    const showChosenSpotAdvert = useMemo(() => {
        if (chosenSpot && chosenSpot.hasOwnProperty('adverts')) {
            return chosenSpot.adverts.map(advert => advertItemMapper(advert))
        }
    }, [chosenSpot])
    return (
        <div className={style.advertsListContainer}>
            {showChosenSpot ? showChosenSpotAdvert : showAllSpotsAdverts}
        </div>
    )
}