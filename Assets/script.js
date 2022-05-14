console.log('this is script.js')

// To do 
// Store all data to local storage 
// Add scroll bar to view
// Add eventlisteners for library form 

class Book {
    constructor (name, author, type){
        this.name = name;
        this.author = author;
        this.type = type;

    }
}

class Display {
    add (book) {
        console.log("Adding to UI");
    }

}