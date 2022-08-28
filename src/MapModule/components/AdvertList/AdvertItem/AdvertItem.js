import style from './AdvertItem.module.css';
export const AdvertItem = ({ advert, moveToChosenAdvertSpotHandler }) => {
    const moveToChosenAdvertSpot = () => {
        moveToChosenAdvertSpotHandler(advert.spotId);
    }

    return (
        <div className={style.itemContainer} onClick={moveToChosenAdvertSpot}>
            <div><img src='img/room2.jpeg' width='150px' height='100px'/></div>
            <h2 className={style.itemTitle}>
                {advert.title}
            </h2>
            <div className={style.description}>
                {advert.description}
            </div>
        </div>
    )
}
