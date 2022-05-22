let booklist = "";
const removeButton = document.getElementById("remove-button");

const savedBooks = document.getElementById("saved-books");
keys = Object.keys(localStorage);

function bookStorage() {
  keys.forEach((key) => {
    const book = localStorage.getItem(key);
    const stringifyBook = JSON.parse(book);
    console.log(stringifyBook);
    booklist = `
    <div class="box">
      <article class="media">
        <div class="media-left">
          <img
            class="image is-150x115"
            src="${stringifyBook.thumbnail}"
            alt="${stringifyBook.title}"
          />
          <br />
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>${stringifyBook.title}</strong>
              <br />
              Author: <span>${stringifyBook.authors}</span>
              <br />
              Average ratings: <span>${stringifyBook.averageRating}</span>/5
            </p>
          </div>
          <button id="remove-button" class="button is-light" onclick=>Remove</button>
        </div>
      </article>
      </div>
    `;
    console.log(booklist);
  });
  savedBooks.innerHTML = booklist;
}

bookStorage();