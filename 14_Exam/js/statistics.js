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
            location.pathname = "/cards.html"
        }
        else{
            return;
        }
    }
})


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
    }
    renderTopBooks();
    renderTopVisitors();
}

function renderTopBooks() {
    const booksList = document.getElementById("top5books");
    booksList.innerHTML = '';

    const bookCounts = {};
    cards.forEach(card => {
        if (bookCounts[card.bookId]) {
            bookCounts[card.bookId]++;
        } else {
            bookCounts[card.bookId] = 1;
        }
    });

    const topBooks = [];
    for (let bookId in bookCounts) {
        const book = books.find(b => b.id === +bookId);
        if (book) {
            topBooks.push({
                id: book.id,
                name: book.name,
                count: bookCounts[bookId]
            });
        }
    }

    topBooks.sort((a, b) => b.count - a.count);

    topBooks.slice(0, 5).forEach((book, index) => {
        booksList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${book.name}</td>
                <td>${book.count}</td>
            </tr>
        `;
    });
}


function renderTopVisitors() {
    const visitorsList = document.getElementById("top5visitors");
    visitorsList.innerHTML = '';


    const visitorCounts = {};
    cards.forEach(card => {
        if (visitorCounts[card.visitorId]) {
            visitorCounts[card.visitorId]++;
        } else {
            visitorCounts[card.visitorId] = 1;
        }
    });


    const topVisitors = [];
    for (let visitorId in visitorCounts) {
        const visitor = visitors.find(v => v.id === +visitorId);
        if (visitor) {
            topVisitors.push({
                id: visitor.id,
                fullName: visitor.fullName,
                phone: visitor.phone,
                count: visitorCounts[visitorId]
            });
        }
    }

    topVisitors.sort((a, b) => b.count - a.count);

    topVisitors.slice(0, 5).forEach((visitor, _) => {
        visitorsList.innerHTML += `
            <tr>
                <td>${visitor.id}</td>
                <td>${visitor.fullName}</td>
                <td>${visitor.phone}</td>
                <td>${visitor.count}</td>
            </tr>
        `;
    });
}



function returnBook(id) {
    const card = cards.find(b => b.id === id);
    if (card) {
        const book = books.find(b => b.id === card.bookId)
        if (book) {
            book.available++;
            card.returnDate = new Date().toDateString()
            writeToLocalStorage();
            renderCards();
        }
        
    }
}

readFromLocalStorage();