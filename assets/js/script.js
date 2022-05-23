const body = document.body;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResultsDiv = document.getElementById("search-results");
const detailedBookDiv = document.getElementById("detailed-book");
let booksList = [];

async function searchBooks(term) {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "47876_2825773de299cd5e0d9827ecde49fac0",
  };
  const { books } = await (
    await fetch(
      ` https://api2.isbndb.com/books/${term}?page=1&pageSize=20&column=title
    `,
      { headers: headers }
    )
  ).json();
  return books.map((info) => {
    return ({ title, authors, image, isbn13 } = info);
  });
}

async function fetchBook(isbn13) {
  removeResultDiv();
  removeSearchBox();
  removeSearchButton();
  const { items = [] } = await (
    await fetch(
      ` https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn13}
    `
    )
  ).json();

  booksList = items.map((info) => {
    const {
      volumeInfo: {
        title,
        description,
        authors,
        publisher,
        imageLinks: { thumbnail },
        averageRating,
      },
    } = info;

    const formattedResponse = {
      title,
      authors,
      publisher: publisher || "Not available",
      description: description || "Not available",
      thumbnail,
      averageRating: averageRating || "N/A",
    };

    detail(formattedResponse);

    return formattedResponse;
  });
}

const detail = (book) => {
  const detailBook = `
    <div class="margin-container">
    <h1 class="title is-2 is book-name">${book.title}</h1>
    <article class="media">
      <div class="media-left">
        <img
          class="image is-250x200"
          src="${book.thumbnail}"
          alt="${book.title}"
        />
      </div>
      <div class="media-content">
        <div class="content">
          <h4>Description:</h4>
          <p>
            ${book.description}
          </p>
        </div>
      </div>
    </article>
    <br />
    <div>
      <p class="is-large">
        <strong>Author: </strong><span>${book.authors}</span>
        <br />
        <strong>Publisher: </strong> <span>${book.publisher}</span>
        <br />
        <strong>Average Ratings: </strong> <span>${book.averageRating}</span> out of 5
      </p>

      <button class="button is-danger save-button"  onclick="saveBook('${book.title}', 'test')">
        <strong>Save</strong>
      </button>
    </div>
  </div>
  `;

  detailedBookDiv.innerHTML = detailBook;
};

function createBookList(books, term) {
  let searchTermH1 = `<h1 class="title is-1 margin-title"><strong>Your results for:<span> ${term}</span></strong>...</h1><br><br>`;
  let resultsHTML = '<div class="box">';
  const placeholderImg = "./img/book-placeholder.png";
  books.forEach((book) => {
    const resultHTML = `
                <div class="container-result"> 
                  <article class="media container-result">
                    <div class="media-left">
                    <img class="image is-150x115 " src="${
                      !book.image ? placeholderImg : book.image
                    }" alt="${book.title}">
                    <br>
                  </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>${book.title}</strong> 
                <br>
                <div>
                Author: <span>${book.authors}</span>
                <br>
                Publisher: <span>${book.publisher}</span>
                </div>
              </p>
            </div>
            <button id='select' class="button is-light" onclick='fetchBook(${
              book.isbn13
            })'><strong>Select</strong>
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

async function search() {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    const books = await searchBooks(searchTerm);
    createBookList(books, searchTerm);
  }
}

const removeResultDiv = () => {
  searchResultsDiv.remove();
};

const removeSearchBox = () => {
  document.getElementById("search-box-container").remove();
};

const removeSearchButton = () => {
  document.getElementById("search-button-container");
  searchResultsDiv.remove();
};

const saveBook = (title) => {
  const bookObject = booksList.find((book) => book.title === title);
  const stringified = JSON.stringify(bookObject);
  localStorage.setItem(title, stringified);
};
