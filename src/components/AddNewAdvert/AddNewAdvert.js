
export const AddNewAdvert = ({ addNewAdvertHandler, updateAdvetTitleHandler, updateAdvetDescriptionHandler, currentAdvetTitleValue, currentAdvetDescriptionValue }) => {
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
            <form onSubmit={addNewAdvert}>
                <input placeholder='Type tytle' onChange={updateTitleInput} value={currentAdvetTitleValue}></input>
                <input placeholder='Type description' onChange={updateDescriptionInput} value={currentAdvetDescriptionValue}></input>
                <button type='submit'>Add New Advert</button>
            </form>
        </div>
    )
}