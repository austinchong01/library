const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggle = function(book) {
  if (book.read == "yes"){
    book.read = "no";
  } else {
    book.read = "yes";
  }
};

function addBookToLibrary(author, title, pages, read) {
  const book = new Book(author, title, pages, read);
  myLibrary.push(book);
};

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("dialog");

openButton.addEventListener("click", () => {
  modal.showModal();
})

//submit button, store form contents in myLibrary array
closeButton.addEventListener("click", (event) => {
  event.preventDefault(); //???
  let author = document.querySelector("#author");
  let title = document.querySelector("#title");
  let pages = document.querySelector("#pages");
  let read = document.querySelector("#read");

  addBookToLibrary(author.value, title.value, pages.value, read.value);
  console.log(myLibrary);
  modal.close();

  renderLibrary();

  //reset fields
  author.value = "";
  title.value = "";
  pages.value = "";
  read.value = "";
})

//renders library to DOM
function renderLibrary(){
  //reset DOM
  let del = document.querySelector("body > div");
  document.body.removeChild(del);
  let library = document.createElement("div");
  document.body.appendChild(library)

  for (let i = 0; i < myLibrary.length; i++){
    currBook = myLibrary[i];

    let book = document.createElement("div");
    book.textContent = currBook.title;
    book.setAttribute("data-index-number", `${i}`);
    library.appendChild(book);

    let remove = document.createElement("button");
    remove.textContent = "REMOVE";
    book.appendChild(remove);

    let read = document.createElement("button");
    read.textContent = "READ";

    //set color to red if did not read, green if read
    console.log(currBook.read);
    if (currBook.read == "yes"){
      read.style.backgroundColor = "lightgreen";
    } else {
      read.style.backgroundColor = "red";
    }
    
    book.appendChild(read);

    //remove element
    remove.addEventListener("click", () => {
      let index = book.getAttribute("data-index-number");

      //remove from Library
      myLibrary.splice(index, 1);
      renderLibrary() //re-render new library

      //remove from DOM
      book.remove();
    })

    //toggle color and read status
    read.addEventListener("click", () => {
      let change = myLibrary[book.getAttribute("data-index-number")];

      //change color
      if (change.read == "yes"){
        read.style.backgroundColor = "red";
      } else {
        read.style.backgroundColor = "lightgreen";
      }

      //change read status
      change.toggle(change);
    })
  }
}