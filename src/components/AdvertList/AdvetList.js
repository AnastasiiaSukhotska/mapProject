import { useCallback, useEffect, useMemo } from "react";
import { AdvertItem } from "./AdvertItem/AdvertItem"

export const AdvertList = ({spots, chosenSpot, showChosenSpot}) => {
    const advertItemMapper = (advert) => (<AdvertItem advert={advert} key={advert.title} />);
    const showAllSpotsAdverts = useMemo( () => spots.flatMap(spot => spot.adverts).map(advertItemMapper), [spots]);
    const showChosenSpotAdvert = useMemo(() => {
        if(chosenSpot.adverts){
            return chosenSpot.adverts.map(advert => advertItemMapper(advert))
        }  
    }, [chosenSpot])

    return (
        <div>
            {showChosenSpot ? showChosenSpotAdvert : showAllSpotsAdverts}
        </div>
    )
}