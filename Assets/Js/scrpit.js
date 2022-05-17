

let input = document.getElementById("search");
const searchButton = document.getElementById("searchButton");


function searchFunction() {
    let url1Google = "https://www.googleapis.com/books/v1/volumes?q=";
    let urlforAPi = url1Google + input.value

   fetch(urlforAPi)
   .then(response => response.text())
   .then(result => console.log(result))
   .catch(error => console.log('error', error));
   }
   

   searchButton.addEventListener("click", searchFunction )

