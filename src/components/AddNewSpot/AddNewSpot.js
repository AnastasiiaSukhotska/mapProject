import style from './AddNewSpot.module.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect } from 'react';
export const AddNewSpot = ({error, isLoaded, onSelect, onNewSpotCoordinateSelect, updateAdvetTitleHandler, updateAdvetDescriptionHandler, currentAdvetTitleValue, currentAdvetDescriptionValue, addNewSpotHandler }) => {
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

    const updatePlaceInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const selectPlaceOption =
        ({ description }) =>
            () => {
                // When user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();
                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                 onNewSpotCoordinateSelect({ lat, lng });
                  onSelect({ lat, lng })
                });
            };
/*
            const formik = useFormik({
                initialValues: {
                 
                    advertTitle: '',
                    advertDescription: '',
                },
                validationSchema: Yup.object({
                    advertTitle: Yup.string()
                    .required('Required'),
                    advertDescription: Yup.string()
                    .required('Required'),

                }),
               onSubmit: (values, value) => {
                   console.log(values)
                }

            })

      */ 
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
            setValue('')
      
    }


    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;
            return (
                <li key={place_id} onClick={selectPlaceOption(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });
    useEffect(() => {
        if (isLoaded) {
            init()
        }
    }, [isLoaded, init])
    return (
        <div>
            <form onSubmit={addNewSpot} className='formContainer'>
            
                <div ref={ref}>
                    <input
                    id='spots'
                        className='formInput'
                        type='text'
                        value={value}
                        onChange={updatePlaceInput}
                        disabled={!ready}
                        placeholder="Where are you going?" />
                    {status === "OK" &&(<ul className={style.suggestionPlacesList}>{renderSuggestions()}</ul>)}
                </div>
                <input id='advertTitle' type='text' className='formInput' placeholder='Type title' onChange={updateTitleInput} value={currentAdvetTitleValue} />
                <input id='advertDescription' type='text' className='formInput' placeholder='Type description' onChange={updateDescriptionInput} value={currentAdvetDescriptionValue}/>
                <button className='submitButton' type='submit'>Add New Spot</button>
            </form>
            {error ? <div>{error}</div>: ''}
            </div>
    )
}