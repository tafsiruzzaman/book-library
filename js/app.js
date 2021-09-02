const startDataLoadProcess = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    if(searchText === '') {
        displayResultQuantity('');
        displayErrorMessage('please write something');
        clearSearchResult();
    }
    else {
        displayErrorMessage('');
        loadSearchData(searchText);
    };
    inputField.value = '';
};

const displayErrorMessage = (errorMessage) => {
    const errorSection = document.getElementById('error-message');
    errorSection.innerText = errorMessage;
};

const loadSearchData = (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => cheakLoadedData(data))
    .catch(err => {
        console.log(err)
        displayErrorMessage('no books found');
        clearSearchResult();
    });
};

const cheakLoadedData = data => {
    if(data.numFound === 0) {
        displayResultQuantity('');
        displayErrorMessage('no books found');
        clearSearchResult();
    }
    else {
        // console.log(data)
        displayResultQuantity(`${data.numFound} books found for "${data.q}"`);
        displaySearchResult(data.docs)
    };
};

const displayResultQuantity = (message) => {
    const resultQuantity = document.getElementById('result-quantity');
    resultQuantity.innerText = message;
};

const clearSearchResult = () => {
    document.getElementById('search-result-container').innerHTML = '';
};

const displaySearchResult = books => {
    const resultContainer = document.getElementById('search-result-container');
    clearSearchResult();
    books.forEach(book => {
        // console.log(book)
        const div = document.createElement('div');
        div.classList = 'col';
        let imgUrl = '';
        if (!book.cover_i) {
            imgUrl = `images/no.png`
        }
        else {
            imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        };
        div.innerHTML = `
            <div class="card h-100 px-2 py-2">
                <img src="${imgUrl}" class="card-img-top img-fluid img-height" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text"><span class="fw-bold">Author: </span>${book.author_name ? book.author_name[0] : "Unknown"}</p>
                    <p class="card-text"><span class="fw-bold">Publisher: </span>${book.publisher ? book.publisher[0] : "Unknown"}</p>
                    <p class="card-text"><span class="fw-bold">Publish Date: </span>${book.first_publish_year ? book.first_publish_year : "Unknown"}</p>
                </div>
            </div>
        `;
        resultContainer.appendChild(div);
    });
};