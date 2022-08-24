import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect } from 'react';
export const AddNewSpot = ({isLoaded, onSelect, onNewSpotCoordinateSelect, updateAdvetTitleHandler, updateAdvetDescriptionHandler, currentAdvetTitleValue, currentAdvetDescriptionValue, addNewSpotHandler}) => {
    const {
        ready,
        value,
        init,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {
                // When user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log("📍 Coordinates: ", { lat, lng });
                    onNewSpotCoordinateSelect({ lat, lng });
                    onSelect({lat, lng})
                });
            
            };

            const updateTitleInput = (e) => {
                let titleValue = e.target.value;
                updateAdvetTitleHandler(titleValue); 
            };
        
        
            const updateDescriptionInput = (e) => {
                let descriptionValue = e.target.value;
                updateAdvetDescriptionHandler(descriptionValue);
            }

            const addNewSpot = (e) => {
                e.preventDefault();
                addNewSpotHandler();
            }

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;
            return (
                <li key={place_id} onClick={handleSelect(suggestion)}>
                  <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
              );
            });
            useEffect(() => {
                if(isLoaded) {
                    init()
                }
            }, [isLoaded, init])
            return (
                <form onSubmit={addNewSpot}>
                <div  ref={ref}>
                    <input
                        type='text'
                       
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Where are you going?" />
                        {status === "OK" && <ul>{renderSuggestions()}</ul>}
                </div>
                <input type='text' placeholder='Type title' onChange={updateTitleInput} value={currentAdvetTitleValue}/>
                <input type='text' placeholder='Type description' onChange={updateDescriptionInput} value={currentAdvetDescriptionValue}/>
                <button type='submit'>Add New Spot</button>
                </form>
            )
        }