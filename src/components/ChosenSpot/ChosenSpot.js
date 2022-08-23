export const ChosenSpot = ({spot}) => {

    console.log(spot.name);
    return (
        <div>
            {spot.name}
            {spot.description}
        </div>
    )
}