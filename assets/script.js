let searchTerm = ''

window.addEventListener("load", () => {
  const form = document.getElementById("form");
  form.addEventListener("click", (e) => {
    e.preventDefault();
  });
  searchBooks()
});

function searchBooks() {
    
    const searchInput = document.getElementById("search-input");
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
        let searchTermH1 = `<h2>Your results for:<span> ${searchTerm}</span></h2>`
        let resultsHTML = '<section class="row">'
        const placeholderImg = './img/book-placeholder.png'
        bookInfos.forEach((info) => {
          const resultHTML = `
                <div class="module">
                    <a href="${info.infoLink}" target="_blank"><img src="${!info.thumbnail ? placeholderImg : info.thumbnail}" alt="${info.title}"></a>
                    <div>
                        <h3 id="title">${info.title}</h3>
                        <h4>Author: <span>${info.authors}</span></h4>
                        <h4>Category: <span>${info.categories}</span></h4>
                        <h4>Publisher: <span>${info.publisher}</span></h4>
                        <a class="info-button" href="${info.infoLink}" target="_blank">More info</a>
                    </div>
                </div>
              `
              resultsHTML += resultHTML

       }) 
       resultsHTML += '</section>'
       searchResultsDiv.innerHTML = searchTermH1 + resultsHTML
    }
    fetchingAPI();
    });
}