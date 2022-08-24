import { Marker } from "@react-google-maps/api"
export const Spot = ({position, onSpotClick}) => {
    const onSpotClickHandler = () => {
        onSpotClick(position.id);
        
    }
    return (
        <Marker onClick={onSpotClickHandler}  icon = {{url : './logo512.png'}} position = {position} label={{text:'My Spot', fontSize:'20px', color:'red'}}  />
    )
}