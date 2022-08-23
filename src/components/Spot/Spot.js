import { Marker } from "@react-google-maps/api"
export const Spot = ({position, onSpotClick}) => {
    const onSpotClickHandler = () => {
        console.log(position.index);
        onSpotClick(position.index);
        
    }
    return (
        <Marker onClick={onSpotClickHandler}  icon = {{url : './logo512.png'}} position = {position} label={{text:'My Spot', fontSize:'20px', color:'red'}}  />
    )
}