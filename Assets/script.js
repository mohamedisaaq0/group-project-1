const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');



const handleSearchButtonClick = (event) => {
    event.preventDefault();
    console.log("button clicked");

    const searchValue = searchInput.value
    console.log(searchValue);

    localStorage.setItem("previous search", searchValue);
}


searchButton.addEventListener("click", handleSearchButtonClick);