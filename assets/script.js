const body = document.body;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResultsDiv = document.getElementById("search-results");
let searchTerm = "";

function search() {
  console.log(searchInput.value);
}

function searchBooks() {
  searchTerm = searchInput.value;

  async function fetchingAPI() {
    const api = await (
      await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    ).json();
    const bookInfos = api.items.map((info) => {
      if (info.volumeInfo.imageLinks) {
        const {
          volumeInfo: {
            title,
            categories,
            authors,
            infoLink,
            publisher,
            imageLinks: { thumbnail },
          },
        } = info;
        return {
          title,
          categories,
          authors,
          infoLink,
          publisher,
          thumbnail,
        };
      } else {
        const {
          volumeInfo: { title, categories, authors, infoLink, publisher },
        } = info;
        return {
          title,
          categories,
          authors,
          infoLink,
          publisher,
        };
      }
    });
    let searchTermH1 = `<h1 class="title is-1"><strong>Your results for:<span> ${searchTerm}</span></strong>...</h1><br><br>`;
    let resultsHTML = '<div class="box">';
    const placeholderImg = "./img/book-placeholder.png";
    bookInfos.forEach((info) => {
      const resultHTML = `
                <div class="container-result"> 
                  <article class="media container-result">
                    <div class="media-left">
                    <a href="${
                      info.infoLink
                    }" target="_blank"><img class="image is-150x115 " src="${
        !info.thumbnail ? placeholderImg : info.thumbnail
      }" alt="${info.title}"></a>
                    <br>
                  </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>${info.title}</strong> 
                <br>
                <div>
                Author: <span>${info.authors}</span>
                <br>
                Category: <span>${info.categories}</span>
                <br>
                Publisher: <span>${info.publisher}</span>
                </div>
              </p>
            </div>
            <button class="button is-light">
            <a class="info-button" href="${
              info.infoLink
            }" target="_blank"><strong>Select</strong></a>
            </button>
          </div>
          
        </article>
        </br><hr>
    </div>
              `;
      resultsHTML += resultHTML;
    });
    resultsHTML += "</div>";
    searchResultsDiv.innerHTML = searchTermH1 + resultsHTML;
  }

  initialiseLocalStorage();
  fetchingAPI();
}

const initialiseLocalStorage = () => {
  localStorage.setItem("Previous Search", searchInput.value);
};
