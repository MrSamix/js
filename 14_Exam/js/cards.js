let cards = [];
let filteredCards = [];

let books = [];
let visitors = [];


let isEditMode = false;

const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal-content p');
const newCardBtn = document.getElementById("newCardBtn");
const form = document.querySelector('.modal-content form');

const searchBtn = document.querySelector(".search button");
const sortBtn = document.querySelector(".sort button");


const nav = document.querySelector("nav")

nav.addEventListener("click", (e) => {
    let elem = e.target
    if (elem.tagName === 'DIV') {
        if (elem.id === "booksBtn") {
            location.pathname = "/books.html"
        }
        else if (elem.id === "visitorsBtn") {
            location.pathname = "/index.html"
        }
        else if (elem.id === "cardsBtn")
        {
            return;
        }
        else{
            location.pathname = "/statistics.html"
        }
    }
})


searchBtn.addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value;
    // filteredBooks = books.filter((book) =>
    //     book.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    //     book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
    //     book.publisher.toLowerCase().includes(searchInput.toLowerCase())
    // );
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

function writeToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books.sort((a, b) => a.id - b.id)));
    localStorage.setItem('visitors', JSON.stringify(visitors.sort((a, b) => a.id - b.id)));
    localStorage.setItem('cards', JSON.stringify(cards.sort((a, b) => a.id - b.id)));
};

function readFromLocalStorage() {
    const booksFromLocalStorage = localStorage.getItem('books');
    if (booksFromLocalStorage) {
        books = JSON.parse(booksFromLocalStorage);
    }
    const visitorsFromLocalStorage = localStorage.getItem('visitors');
    if (visitorsFromLocalStorage) {
        visitors = JSON.parse(visitorsFromLocalStorage);
    }
    const cardsFromLocalStorage = localStorage.getItem('cards');
    if (cardsFromLocalStorage) {
        cards = JSON.parse(cardsFromLocalStorage);
        renderCards();
    }
}

function renderFiltredCards() {
    const cardsList = document.querySelector('tbody');
    cardsList.innerHTML = '';

    filteredBooks.forEach((book, _) => {
        cardsList.innerHTML += `<tr>
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


function renderCards() {
    const cardsList = document.querySelector('tbody');
    cardsList.innerHTML = '';

    cards.forEach((card, _) => {
        const book = books.find(b => b.id === card.bookId);
        const visitor = visitors.find(v => v.id === card.visitorId);
        cardsList.innerHTML += `<tr>
                    <td>${card.id}</td>
                    <td>${visitor.fullName}</td>
                    <td>${book.name}</td>
                    <td>${card.borrowDate}</td>
                    <td>${card.returnDate === null? '<button class="returnBtn" onclick="returnBook(3)">&#9166;</button>': card.returnDate}</td>
                </tr>`
    })
}


function returnBook(id) {
    const book = books.find(b => b.id === id);
    if (book) {
        book.available++;
        writeToLocalStorage();
        renderCards();
    }
}

newCardBtn.addEventListener("click", () => {
    isEditMode = false;
    const h3 = document.querySelector('.modal-content h3');
    h3.textContent = "New Card";


    const visitorSelect = document.getElementById("visitor");
    visitorSelect.innerHTML = '';
    visitors.forEach(visitor => {
        const option = document.createElement("option");
        option.value = visitor.id;
        option.textContent = visitor.fullName;
        visitorSelect.appendChild(option);
    });

    const bookSelect = document.getElementById("book");
    bookSelect.innerHTML = '';
    books.forEach(book => {
        if (book.available > 0) {
            const option = document.createElement("option");
            option.value = book.id;
            option.textContent = book.name;
            bookSelect.appendChild(option);
        }
    });


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
    const visitor = formData.get('visitor');
    const book = formData.get('book');


    // const bookObj = books.find(b => b.name === book);
    // if (bookObj && bookObj.available > 0) {
    //     bookObj.available--;
    // } else {
    //     alert("Book is not available.");
    //     return;
    // }
    // const visitorObj = visitors.find(v => v.name === visitor);
    // if (!visitorObj) {
    //     alert("Visitor not found.");
    //     return;
    // }

    let lastElem = visitors.at(visitors.length-1);
    let id = lastElem ? lastElem.id + 1 : 1;

    if (visitor && book) {
        const card = {
            id: id,
            // visitorId: visitorObj.id,
            // bookId: bookObj.id,
            visitorId: +visitor,
            bookId: +book,
            borrowDate: new Date().toLocaleDateString(),
            returnDate: null
        };

        cards.push(card);

        form.reset();
        modal.style = "display: none;";
        renderCards();
        writeToLocalStorage();
    }
    else {
        alert("Please fill in all fields.");
    }
});


readFromLocalStorage();