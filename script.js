const content = document.querySelector(".content"); // Assigns the content div to a variable
const form = document.querySelector("form");        // Assigns the form to a variable

form.addEventListener('submit', function(e) {       // Add an event listener for when the submit button is clicked

    e.preventDefault();                             // Prevent the page from changing on a post action
    let read = document.querySelector('#has-read'); // Select the checkbox

    let newEntry = new Book(form['title'].value, form['author'].value, form['pages'].value, read.checked); // Create a new book object consisting of user supplied values

    addToLibrary(newEntry);                         // Add the newly created book to the library
    form.reset();                                   // Reset the form
    buildLibrary();                                 // (re)build the library
});

let myLibrary = [];                                 // Create the library array

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    get getReadStatus() {
        return this.hasRead;
    }

    set setReadStatus(condition) {
        this.hasRead = condition;
    }


}

function addToLibrary(book) {                       // Function for adding a book to the array
    myLibrary.push(book);                           // Push the book into the array
}

function buildLibrary() {                           // Build the library on the user's screen
    while(content.lastChild) {                      // While there is still a child div in the content div...
        content.removeChild(content.lastChild);     // Remove the last child in the content div.
    }
    myLibrary.forEach((book) => {                   // For each book in the myLibrary array
        let item = document.createElement("div");   // Create a new div...
        item.classList.add("book");                 // Give it the "book" class
        item.setAttribute('id', myLibrary.indexOf(book))    // Give it an id corresponding to the book's index in the myLibrary array
    
        let title = document.createElement("div");  // Lines 37 - 51 create divs within the book containing text representations of Book attributes
        title.textContent = book.title;
        title.classList.add("title");
    
        let author = document.createElement("div");
        author.textContent = book.author;
        author.classList.add("author");
    
        let pages = document.createElement("div");
        pages.textContent = book.pages;
        pages.classList.add("pages");
    
        let read = document.createElement("div");
        if(book.getReadStatus == true) {
            read.textContent = "Completed!"
        } else {
            read.textContent = "Incomplete"
        }
        read.classList.add("read");
        read.addEventListener('click', function(e) {
            let temp = true;
            if(book.getReadStatus == true) {
                temp = false;
            }
            book.setReadStatus = temp;
            if(book.getReadStatus == true) {
                read.textContent = "Completed!"
            } else {
                read.textContent = "Incomplete"
            }
        })


        let remove = document.createElement("button");  // Create a new button...
        remove.textContent = "Remove Book"              // Have the button's text content be "Remove Book"
        remove.classList.add("remove");                 // Add the "remove" class
        remove.addEventListener('click', function(e) {  // Add an event listener that listens for a click event
            myLibrary.splice(remove.parentElement.getAttribute('id'), 1)    // On click, remove from the array the item at the specified index corresponding to the book div's id
            buildLibrary();                                                 // Rebuild the library
        })
    
        item.appendChild(title);        // Lines 61 - 66 add the above content to the html document
        item.appendChild(author);
        item.appendChild(pages);
        item.appendChild(read);
        item.appendChild(remove);
        content.appendChild(item);
        }
    );
}