
export const AddNewAdvert = ({error, addNewAdvertHandler, updateAdvetTitleHandler, updateAdvetDescriptionHandler, currentAdvetTitleValue, currentAdvetDescriptionValue }) => {
    const updateTitleInput = (e) => {
        let titleValue = e.target.value;
        updateAdvetTitleHandler(titleValue);
    };


    const updateDescriptionInput = (e) => {
        let descriptionValue = e.target.value;
        updateAdvetDescriptionHandler(descriptionValue);
    }

    const addNewAdvert = (e) => {
        e.preventDefault();
        addNewAdvertHandler();
    }

    return (
        <div>
            <form onSubmit={addNewAdvert} className='formContainer'>
                <input placeholder='Type tytle' className='formInput' onChange={updateTitleInput} value={currentAdvetTitleValue}></input>
                <input placeholder='Type description' className='formInput' onChange={updateDescriptionInput} value={currentAdvetDescriptionValue}></input>
                <button className='submitButton' type='submit'>Add New Advert</button>
            </form>
            {error ? <div>{error}</div>: ''}
        </div>
    )
}