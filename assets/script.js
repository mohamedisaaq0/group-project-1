const body = document.body
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');




const handleSearchButtonClick = (event) => {
    event.preventDefault();

    initialiseLocalStorage();
    searchFunction();
    resultsFor();
    renderResults();
   
}


const resultsFor = () => {
// creating elements 
const divResultsFor = document.createElement("div");
divResultsFor.setAttribute("class", "section");
const resultTitle = document.createElement("h2");
resultTitle.setAttribute("class", "title");
resultTitle.classList.add("is-2");
resultTitle.textContent = "Results for " + searchInput.value + "...";
searchInput.value = ''

// appending element into each other
body.append(divResultsFor);
divResultsFor.append(resultTitle);
}


const renderResults = () => {
// creating Elements to render results dynamically
const divContainer = document.createElement("div");
divContainer.setAttribute("class", "box");
const article = document.createElement("article");
article.setAttribute("class", "media");
const divArticle = document.createElement("div");
divArticle.setAttribute("class", "media-left");
const figure = document.createElement("figure");
figure.setAttribute("class", "image");
figure.classList.add('is-64x64');
const img = document.createElement("img");
img.src = "https://lumiere-a.akamaihd.net/v1/images/p_thejunglebook2016_19751_6b8cfcec.jpeg";
img.alt = "book cover";
const divMediaContent = document.createElement("div");
divMediaContent.setAttribute("class", "media-content");
const divContent = document.createElement("div");
divContent.setAttribute("class", "content")
const paragraph = document.createElement("p");
const titleName = document.createElement("strong");
titleName.setAttribute("id", "title-name")
titleName.textContent = searchInput.value
const brTag = document.createElement("br");
const spanTag = document.createElement("span");
spanTag.textContent = ""
spanTag.setAttribute("id", "descriptiond")
const divButton = document.createElement("div");
const selectButton = document.createElement("button");
selectButton.setAttribute("class", "button");
selectButton.classList.add("is-dark");
selectButton.setAttribute("id", "select-button");
const strongTagSelect = document.createElement("strong");
strongTagSelect.append("Select");
const saveButton = document.createElement("button");
saveButton.setAttribute("class", "button");
saveButton.classList.add("is-dark");
saveButton.setAttribute("id", "save-button");
const strongTagSave = document.createElement("strong");
strongTagSave.append("Save");


// appending the elements into each other


body.append(divContainer)
divContainer.append(article);
article.append(divArticle, divMediaContent);
divArticle.append(figure)
figure.append(img);
divContent.append(paragraph);
paragraph.append(titleName);
paragraph.append(brTag);
paragraph.append(spanTag);
divMediaContent.append(divContent);
divMediaContent.append(selectButton);
divMediaContent.append(saveButton);
selectButton.append(strongTagSelect);
saveButton.append(strongTagSave)

}

const initialiseLocalStorage = () => {
    localStorage.setItem("previous search", searchInput.value);
}



const searchFunction = () => {
    let url1Google = "https://www.googleapis.com/books/v1/volumes?q=";
    let urlforAPi = url1Google + searchInput.value

   fetch(urlforAPi)
   .then(response => response.text())
   .then(result => console.log(result))
   .catch(error => console.log('error', error));
   }
   



searchButton.addEventListener("click", handleSearchButtonClick);
