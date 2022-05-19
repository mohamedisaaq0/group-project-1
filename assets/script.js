const body = document.body
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let searchTerm = ''

window.addEventListener("load", () => {
  const form = document.getElementById("form");
  form.addEventListener("click", (e) => {
    e.preventDefault();
  });
  searchBooks();
  initialiseLocalStorage();
});

function searchBooks() {
    
    searchInput.addEventListener("change", (e) => {
    searchTerm = e.target.value;

    const searchResultsDiv = document.getElementById('search-results')

    async function fetchingAPI() {
        const api = await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)).json();
        const bookInfos = api.items.map(info => {
          if(info.volumeInfo.imageLinks) {
            const { volumeInfo: {title, categories, authors, infoLink, publisher, imageLinks:{thumbnail}}} = info
            return {
              title,
              categories,
              authors,
              infoLink,
              publisher,
              thumbnail,
            }
          } else {
            const {volumeInfo: {title, categories, authors, infoLink, publisher}} = info
            return {
              title,
              categories,
              authors,
              infoLink,
              publisher
            }
          }
        })        
        let searchTermH1 = `<h1 class="title is-1"><strong>Your results for:<span> ${searchTerm}</span></strong>...</h1><br><br>`
        let resultsHTML = '<section class="row">'
        const placeholderImg = './img/book-placeholder.png'
        bookInfos.forEach((info) => {
          const resultHTML = `
                <div class="">
                    <h3 class="title is-4 title-name" id="title">${info.title}</h3>
                    <a href="${info.infoLink}" target="_blank"><img class="image " src="${!info.thumbnail ? placeholderImg : info.thumbnail}" alt="${info.title}"></a>
                    <br>
                    <div>
                        <h4>Author: <span>${info.authors}</span></h4>
                        <h4>Category: <span>${info.categories}</span></h4>
                        <h4>Publisher: <span>${info.publisher}</span></h4>
                        <button class="button is-light">
                        <a class="info-button" href="${info.infoLink}" target="_blank"><strong>More info</strong></a>
                        </button>
                        <button class="button is-light">
                        <a class="info-button" href="${info.infoLink}" target="_blank"><strong>Select</strong></a>
                        </button>
                    </div>
                    <br>
                <div>
              `
              resultsHTML += resultHTML

       }) 
       resultsHTML += '</section>'
       searchResultsDiv.innerHTML = searchTermH1 + resultsHTML
    }
    searchInput.value = ""
    fetchingAPI();
    });
}



