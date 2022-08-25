import style from './AdvertItem.module.css';
export const AdvertItem = ({ advert, moveToChosenAdvertSpotHandler }) => {
    const moveToChosenAdvertSpot = () => {
        moveToChosenAdvertSpotHandler(advert.spotId);
    }

    return (
        <div className={style.itemContainer} onClick={moveToChosenAdvertSpot}>
            <div>
                {advert.title}
            </div>
            <div>
                {advert.description}
            </div>
        </div>
    )
}
