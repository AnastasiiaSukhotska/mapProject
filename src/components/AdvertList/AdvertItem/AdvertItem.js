import style from './AdvertItem.module.css';
export const AdvertItem = ({advert}) => {
    return (
        <div className={style.itemContainer}>
            <div>
                {advert.title}
            </div>
            <div>
                {advert.description}
            </div>
        </div>
    )
}
