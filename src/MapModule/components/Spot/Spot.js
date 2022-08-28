import { Marker } from "@react-google-maps/api"
export const Spot = ({ spot, chooseSpotHandler, iconPath }) => {
    const chooseSpot = () => {
        chooseSpotHandler(spot.id);
    }
    return (
        <Marker onClick={chooseSpot} icon={{ url: iconPath }} position={spot}   />
    )
}