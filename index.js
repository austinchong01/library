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
  event.preventDefault(); //not submitting to server, does not clear input elements
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

//renders whole library to DOM
function renderLibrary(){
  //reset DOM
  const del = document.querySelector("table");
  del.remove();

  const table = document.createElement("table");
  const label = document.createElement("tr");
  const labelAuthor = document.createElement("th");
  labelAuthor.textContent = "Author";
  const labelTitle = document.createElement("th");
  labelTitle.textContent = "Title";
  const labelPages = document.createElement("th");
  labelPages.textContent = "Pages";
  const labelRead = document.createElement("th");
  labelRead.textContent = "Status";

  label.appendChild(labelAuthor);
  label.appendChild(labelTitle);
  label.appendChild(labelPages);
  label.appendChild(labelRead);
  table.appendChild(label);
  document.body.appendChild(table);

  
  for (let i = 0; i < myLibrary.length; i++){
    let currBook = myLibrary[i];

    //create row for one book
    const book = document.createElement("tr");
    book.setAttribute("data-index-number", `${i}`); //set attribute for index in myLibrary array

    //add author
    const author = document.createElement("td");
    author.textContent = currBook.author;
    book.appendChild(author);
    
    //add title
    const title = document.createElement("td");
    title.textContent = currBook.title;
    book.appendChild(title);

    //add pages
    const pages = document.createElement("td");
    pages.textContent = currBook.pages;
    book.appendChild(pages);

    //add read status
    const readTD = document.createElement("td");
    const readBtn = document.createElement("button");
    readBtn.textContent = "READ";
    //set color to red if did not read, green if read
    if (currBook.read == "yes"){
      readBtn.style.backgroundColor = "lightgreen";
    } else {
      readBtn.style.backgroundColor = "red";
    }
    readTD.appendChild(readBtn)
    book.appendChild(readTD);

    //add remove button
    const remTD = document.createElement("td");
    const remBtn = document.createElement("button");
    remBtn.textContent = "REMOVE";
    remTD.appendChild(remBtn)
    book.appendChild(remTD);

    table.appendChild(book);

    //remove element
    remBtn.addEventListener("click", () => {
      let index = parseInt(book.getAttribute("data-index-number"));

      //remove from Library
      myLibrary.splice(index, 1);

      //re-render new library
      renderLibrary();
    })

    //toggle color and read status
    readBtn.addEventListener("click", () => {
      let change = myLibrary[book.getAttribute("data-index-number")];

      //change color
      if (change.read == "yes"){
        readBtn.style.backgroundColor = "red";
      } else {
        readBtn.style.backgroundColor = "lightgreen";
      }

      //change read status
      change.toggle(change);
    })
  }
}

