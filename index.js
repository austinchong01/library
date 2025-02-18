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

  //add book to DOM tree
  let book = document.createElement("div");
  let remove = document.createElement("button");
  book.textContent = title.value;
  book.setAttribute("data-index-number", `${myLibrary.length - 1}`);
  remove.textContent = "REMOVE"
  document.body.appendChild(book);
  book.appendChild(remove);

  remove.addEventListener("click", () => {
    console.log(book);
    let index = book.getAttribute("data-index-number");
    //remove from library as well
    myLibrary.splice(index, 1, "None");
    book.remove();

    console.log(myLibrary);
  })


  //reset fields
  author.value = "";
  title.value = "";
  pages.value = "";
  read.value = "";
})

//add button on each book to change "read" status