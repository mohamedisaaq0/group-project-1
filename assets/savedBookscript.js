let booklist = "";

const searchResultsDiv = document.getElementById("search-results");

const retiveDatefromls = () => {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    booklist = JSON.parse(value);
  }
};
const renderBooklist = () => {
  console.log(booklist);
};

retiveDatefromls();
renderBooklist();
