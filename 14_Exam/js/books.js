let books = [];
let filteredBooks = [];
let isEditMode = false;

const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal-content p');
const newBookBtn = document.getElementById("newBookBtn");
const form = document.querySelector('.modal-content form');

const searchBtn = document.querySelector(".search button");
const sortBtn = document.querySelector(".sort button");


const nav = document.querySelector("nav")

nav.addEventListener("click", (e) => {
    let elem = e.target
    if (elem.tagName === 'DIV') {
        if (elem.id === "booksBtn") {
            return
        }
        else if (elem.id === "visitorsBtn") {
            location.pathname = "/index.html"
        }
        else if (elem.id === "cardsBtn")
        {
            location.pathname = "/cards.html"
        }
        else{
            location.pathname = "/statistics.html"
        }
    }
})


searchBtn.addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value;
    filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchInput.toLowerCase())
    );
    renderFiltredBooks();
});

sortBtn.addEventListener("click", () => {
    const sortInput = document.getElementById("sortSelect").value;
    if (sortInput === "id") {
        books.sort((a, b) => a.id - b.id);
    } 
    else if (sortInput === "name") {
        books.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortInput === "author") {
        books.sort((a, b) => a.author.localeCompare(b.author));
    }
    else if (sortInput === "publisher") {
        books.sort((a, b) => a.publisher.localeCompare(b.publisher));
    }
    else if (sortInput === "available") {
        books.sort((a, b) => a.available.localeCompare(b.available));
    }
    renderBooks();
});

function writeBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books.sort((a, b) => a.id - b.id)));
};
function readBooksFromLocalStorage() {
    const booksFromLocalStorage = localStorage.getItem('books');
    if (booksFromLocalStorage) {
        books = JSON.parse(booksFromLocalStorage);
        renderBooks();
    }
}


function renderFiltredBooks() {
    const booksList = document.querySelector('tbody');
    booksList.innerHTML = '';

    filteredBooks.forEach((book, _) => {
        booksList.innerHTML += `<tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.year}</td>
                    <td>${book.publisher}</td>
                    <td>${book.pages}</td>
                    <td>${book.available}</td>
                    <td style="text-align: center;"><button class="editBtn" onclick="editBook(${book.id})">&#128393;</button></td>
                    <td style="text-align: center;"><button class="removeBtn" onclick="removeBook(${book.id})">&#128465;</button></td>
                </tr>`
    })
}


function renderBooks() {
    const booksList = document.querySelector('tbody');
    booksList.innerHTML = '';

    books.forEach((book, _) => {
        booksList.innerHTML += `<tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.year}</td>
                    <td>${book.publisher}</td>
                    <td>${book.pages}</td>
                    <td>${book.available}</td>
                    <td style="text-align: center;"><button class="editBtn" onclick="editBook(${book.id})">&#128393;</button></td>
                    <td style="text-align: center;"><button class="removeBtn" onclick="removeBook(${book.id})">&#128465;</button></td>
                </tr>`
    })
}

function editBook(id) {
    let book = books.find(b => b.id === id);
    isEditMode = true;
    const h3 = document.querySelector('.modal-content h3');
    h3.textContent = "Edit Book";
    if (book) {

        form.elements.name.value = book.name;
        form.elements.author.value = book.author;
        form.elements.year.value = book.year;
        form.elements.publisher.value = book.publisher;
        form.elements.pages.value = book.pages;
        form.elements.available.value = book.available;

        modal.style = "";
        
        form.onsubmit = (e) => {
            e.preventDefault();
            if (isEditMode) {
                if (form.elements.name.value && form.elements.author.value &&
                    form.elements.year.value && form.elements.publisher.value &&
                    form.elements.pages.value && form.elements.available.value)
                    {
                        book.name = form.elements.name.value;
                        book.author = form.elements.author.value;
                        book.year = form.elements.year.value;
                        book.publisher = form.elements.publisher.value;
                        book.pages = form.elements.pages.value;
                        book.available = form.elements.available.value;
                        modal.style = "display: none;";
                        form.reset();
                        renderBooks();
                        writeBooksToLocalStorage();
                    }
                else {
                    alert("Please fill in all fields.");
                }
            }
        };
    }
}

function removeBook(id) {
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex !== -1) {
        if (!confirm("Are you sure you want to delete this book?")) {
            return;
        }
        books.splice(bookIndex, 1);
        renderBooks();
        writeBooksToLocalStorage();
    }
    else {
        alert("Book not found.");
    }
}

newBookBtn.addEventListener("click", () => {
    isEditMode = false;
    const h3 = document.querySelector('.modal-content h3');
    h3.textContent = "New Book";

    form.reset();
    modal.style = "";
});

closeModalBtn.addEventListener("click", () => { 
    modal.style = "display: none;";
    form.reset();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isEditMode) {
        return;
    }
    const formData = new FormData(form);
    const name = formData.get('name');
    const author = formData.get('author');
    const year = formData.get('year');
    const publisher = formData.get('publisher');
    const pages = formData.get('pages');
    const available = formData.get('available');


    let lastElem = books.at(books.length-1);
    let id = lastElem ? lastElem.id + 1 : 1;

    if (pages <= 0 || available <= 0) {
        alert("Count of pages and available must be greater than 0!")
        return;
    }


    if (name && author && year && publisher && pages && available) {
        const book = {
            id: id,
            name: name,
            author: author,
            year: year,
            publisher: publisher,
            pages: pages,
            available: available
        };

        books.push(book);

        form.reset();
        modal.style = "display: none;";
        renderBooks();
        writeBooksToLocalStorage();
    }
    else {
        alert("Please fill in all fields.");
    }
});


readBooksFromLocalStorage();