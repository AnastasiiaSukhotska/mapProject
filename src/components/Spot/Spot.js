import { Marker } from "@react-google-maps/api"
export const Spot = ({ spot, chooseSpotHandler }) => {
    const chooseSpot = () => {
        chooseSpotHandler(spot.id);

    }
    return (
        <Marker onClick={chooseSpot} icon={{ url: '/pin-point-svgrepo-com.svg' }} position={spot}  />
    )
}