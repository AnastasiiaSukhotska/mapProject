import { useCallback, useEffect, useMemo } from "react";
import { SpotItem } from "./SpotItem/SpotItem"

export const SpotsList = ({spots}) => {
   
    const showList = () => 
    spots.map(spot => <SpotItem spot={spot} key={spot.index}/>);
   
    useEffect (() => {
        console.log(spots);
    }, [spots])

       
    
   
    return (
        <div>
            njon 
           {(spots !==[]) ? spots.map(spot => <SpotItem spot={spot} key={spot.index}/>) : 'nkjnojn'}
        </div>
    )
}