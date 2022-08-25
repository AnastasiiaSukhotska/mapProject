import { Marker } from "@react-google-maps/api"
export const Spot = ({ spot, chooseSpotHandler }) => {
    const chooseSpot = () => {
        chooseSpotHandler(spot.id);

    }
    return (
        <Marker onClick={chooseSpot} icon={{ url: './logo512.png' }} position={spot} label={{ text: 'My Spot', fontSize: '20px', color: 'red' }} />
    )
}