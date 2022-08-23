import { Marker } from "@react-google-maps/api";
export const CurrentLocationMarker = ({position}) => {
    return (<Marker icon = {{url : './logo512.png'}} position = {position} label={{text:'hello', fontSize:'20px', color:'red'}}/>)
    
    
}