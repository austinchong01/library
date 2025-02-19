const myLibrary = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
}

function addBookToLibrary(author, title, pages) {
  const book = new Book(author, title, pages);
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

  addBookToLibrary(author.value, title.value, pages.value);
  console.log(myLibrary);
  modal.close();

  renderLibrary();

  //reset fields
  author.value = "";
  title.value = "";
  pages.value = "";
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
    Book.prototype.status = false; //???
    console.log(Book.prototype.status);
    book.appendChild(read);

    remove.addEventListener("click", () => {
      let index = book.getAttribute("data-index-number");
      myLibrary.splice(index, 1);
      renderLibrary()
      book.remove();
    })

    read.addEventListener("click", () => {
      if (book.status){
        book.status = false;
      } else {
        book.status = true;
      }
      console.log(book.status)
    })
  }
}

//add button on each book to change "read" status
// function toggle(book){
//   if (book.prototype.status){
//     book.prototype.status = false;
//   } else {
//     book.prototype.status = true;
//   }
//   console.log(book.prototype.status)
// }