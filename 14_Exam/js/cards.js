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



const compareDates = (d1, d2) => {
    let date1 = Date.parse(d1);
    let date2 = Date.parse(d2);
  
    if (date1 === NaN && date2) {
        return -1
    }
    else if(date1 && date2 === NaN)
    {
        return 1;
    }


    if (date1 < date2) {
        return 1
    } else if (date1 > date2) {
        return -1
    } else {
        return 0
    }
  };


searchBtn.addEventListener("click", () => { 
    const searchInput = document.getElementById("searchInput").value.toLowerCase();

    filteredCards = cards.filter((card) => {
        const visitor = visitors.find(v => v.id === card.visitorId);
        const book = books.find(b => b.id === card.bookId);

        return (visitor && visitor.fullName.toLowerCase().includes(searchInput)) || 
               (book && book.name.toLowerCase().includes(searchInput));
    });

    renderFiltredCards();
});

sortBtn.addEventListener("click", () => {
    const sortInput = document.getElementById("sortSelect").value;
    if (sortInput === "id") {
        cards.sort((a, b) => a.id - b.id);
    } 
    else if (sortInput === "visitor") {
        visitors.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
    else if (sortInput === "book") {
        books.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortInput === "borrowDate") {
        cards.sort((d1, d2) => compareDates(d1.borrowDate, d2.borrowDate));
    }
    else if (sortInput === "returnDate") {
        cards.sort((d1, d2) => compareDates(d1.returnDate, d2.returnDate));
    }
    renderCards();
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

    filteredCards.forEach((card, _) => {
        const book = books.find(b => b.id === card.bookId);
        const visitor = visitors.find(v => v.id === card.visitorId);
        cardsList.innerHTML += `<tr>
                    <td>${card.id}</td>
                    <td>${visitor.fullName}</td>
                    <td>${book.name}</td>
                    <td>${new Date(card.borrowDate).toLocaleDateString()}</td>
                    <td>${card.returnDate === null? '<button class="returnBtn" onclick="returnBook('+card.id+')">&#9166;</button>': new Date(card.returnDate).toLocaleDateString()}</td>
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
                    <td>${new Date(card.borrowDate).toLocaleDateString()}</td>
                    <td>${card.returnDate === null? '<button class="returnBtn" onclick="returnBook('+card.id+')">&#9166;</button>': new Date(card.returnDate).toLocaleDateString()}</td>
                </tr>`
    })
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

    let lastElem = cards.at(cards.length-1);
    let id = lastElem ? lastElem.id + 1 : 1;

    if (visitor && book) {
        const card = {
            id: id,
            visitorId: +visitor,
            bookId: +book,
            borrowDate: new Date().toDateString(),
            returnDate: null
        };


        const bookObj = books.find(b => b.id === +book);
        bookObj.available--;

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