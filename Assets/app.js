let searchName = ""

window.addEventListener("load", () =>{
  const form = document.getElementById("form");
  e.preventDefault("click", (e) => {
});
searchBooks()
});

function searchBooks () {

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener ("change", (e) => {
  searchName = e.target.value;
   
  const searchResultsDiv = document.getElementById ("search-results")

  async function fetchingAPI () {
    const api = await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchName}`)).json ();
    const bookInfo = api.items.map(info => {
      if (info.volumeInfo.imageLinks){
      const {volumeInfo: {}}
      }
    })
  }


  })
}
