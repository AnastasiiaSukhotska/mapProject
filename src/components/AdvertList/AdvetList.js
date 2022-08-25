import { useMemo } from "react";
import { AdvertItem } from "./AdvertItem/AdvertItem";
import style from './AdvertList.module.css';
export const AdvertList = ({ spots, chosenSpot, showChosenSpot, moveToChosenAdvertSpotHandler }) => {
    const advertItemMapper = (advert) => (<AdvertItem advert={advert} key={advert.title} moveToChosenAdvertSpotHandler={moveToChosenAdvertSpotHandler} />);
    const showAllSpotsAdverts = useMemo(() => spots.flatMap(spot => spot.adverts).map(advertItemMapper), [spots]);
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