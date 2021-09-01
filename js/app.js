const startDataLoadProcess = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    if(searchText === '') {
        displayErrorMessage('please search something')
    }
};

const displayErrorMessage = (errorMessage) => {
    console.log(errorMessage)
}