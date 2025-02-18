const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  const book = new Book(author, title, pages, read);
  myLibrary.push(book);
}

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
    let book = document.createElement("div");
    let remove = document.createElement("button");
    currBook = myLibrary[i];
    book.textContent = currBook.title;
    book.setAttribute("data-index-number", `${i}`);
    remove.textContent = "REMOVE";
    library.appendChild(book);
    book.appendChild(remove);

    remove.addEventListener("click", () => {
      let index = book.getAttribute("data-index-number");
      myLibrary.splice(index, 1);
      renderLibrary()
      book.remove();
    })
  }
}

//add button on each book to change "read" status