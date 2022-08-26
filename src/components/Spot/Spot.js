import { Marker } from "@react-google-maps/api"
export const Spot = ({ spot, chooseSpotHandler, chosenSpot, iconPath }) => {
    const chooseSpot = () => {
        chooseSpotHandler(spot.id);
    }
    return (
        <Marker onClick={chooseSpot} icon={{ url: iconPath }} position={spot}   />
    )
}