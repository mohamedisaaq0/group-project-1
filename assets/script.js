const body = document.body;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResultsDiv = document.getElementById("search-results");

// function search() {
//   console.log(searchInput.value);
// }


async function searchBooks(term) {
  let headers = {
    "Content-Type": 'application/json',
    "Authorization": '47876_2825773de299cd5e0d9827ecde49fac0'
  }
  const {books} = await (
    await fetch(` https://api2.isbndb.com/books/${term}?page=1&pageSize=20&column=title
    `,{headers:headers}
    )
  ).json();
  return books.map((info) => {
    return {
      title,
      authors,
      image,
      isbn
    } = info;
});
}

function fetchBook(isbn){
  console.log(isbn)
}

function createBookList(books, term) {

    let searchTermH1 = `<h1 class="title is-1"><strong>Your results for:<span> ${term}</span></strong>...</h1><br><br>`;
    let resultsHTML = '<div class="box">';
    const placeholderImg = "./img/book-placeholder.png";
    books.forEach((book) => {
      const resultHTML = `
                <div class="container-result"> 
                  <article class="media container-result">
                    <div class="media-left">
                    <a href="${
                      book.infoLink
                    }" target="_blank"><img class="image is-150x115 " src="${
        !book.image ? placeholderImg : book.image
      }" alt="${book.title}"></a>
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
                Category: <span>${book.categories}</span>
                <br>
                Publisher: <span>${book.publisher}</span>
                </div>
              </p>
            </div>
            <button id='select' class="button is-light" onclick='fetchBook(${book.isbn})'>
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

  // initialiseLocalStorage();
  // fetchBook();
async function search(){
  const searchTerm = searchInput.value;
  if(searchTerm){
    const books =  await searchBooks(searchTerm)
    createBookList(books, searchTerm)
  }
}

const initialiseLocalStorage = () => {
  localStorage.setItem("Previous Search", searchInput.value);
};
