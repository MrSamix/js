let visitors = [];
let filteredVisitors = [];
let isEditMode = false;

const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.modal-content p');
const newVisitorBtn = document.getElementById("newVisitorBtn");
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
            return;
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
    filteredVisitors = visitors.filter(visitor =>
        visitor.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
        visitor.phone.includes(searchInput)
    );
    renderFiltredVisitors();
});

sortBtn.addEventListener("click", () => {
    const sortInput = document.getElementById("sortSelect").value;
    if (sortInput === "id") {
        visitors.sort((a, b) => a.id - b.id);
    } 
    else if (sortInput === "name") {
        visitors.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
    renderVisitors();
});

function writeVisitorsToLocalStorage() {
    localStorage.setItem('visitors', JSON.stringify(visitors.sort((a, b) => a.id - b.id)));
};
function readVisitorsFromLocalStorage() {
    const visitorsFromLocalStorage = localStorage.getItem('visitors');
    if (visitorsFromLocalStorage) {
        visitors = JSON.parse(visitorsFromLocalStorage);
        renderVisitors();
    }
}


function renderFiltredVisitors() {
    const visitorsList = document.querySelector('tbody');
    visitorsList.innerHTML = '';

    filteredVisitors.forEach((visitor, _) => {
        visitorsList.innerHTML += `<tr>
                    <td>${visitor.id}</td>
                    <td>${visitor.fullName}</td>
                    <td>${visitor.phone}</td>
                    <td><button class="editBtn" onclick="editVisitor(${visitor.id})">&#9166;</button></td>
                </tr>`
    })
}


function renderVisitors() {
    const visitorsList = document.querySelector('tbody');
    visitorsList.innerHTML = '';

    visitors.forEach((visitor, _) => {
        visitorsList.innerHTML += `<tr>
                    <td>${visitor.id}</td>
                    <td>${visitor.fullName}</td>
                    <td>${visitor.phone}</td>
                    <td><button class="editBtn" onclick="editVisitor(${visitor.id})">&#9166;</button></td>
                </tr>`
    })
}

function editVisitor(id) {
    let visitor = visitors.find(v => v.id === id);
    isEditMode = true;
    const h3 = document.querySelector('.modal-content h3');
    h3.textContent = "Edit Visitor";
    if (visitor) {

        const fullNameInput = form.elements.fullname;
        const phoneInput = form.elements.phone;

        fullNameInput.value = visitor.fullName;
        phoneInput.value = visitor.phone;

        modal.style = "";
        
        form.onsubmit = (e) => {
            e.preventDefault();
            if (isEditMode) {
                if (fullNameInput.value && phoneInput.value) {
                    if (/^[\d\s-]+$/.test(phoneInput.value)) {
                        visitor.fullName = fullNameInput.value;
                        visitor.phone = phoneInput.value;
                        modal.style = "display: none;";
                        form.reset();
                        renderVisitors();
                        writeVisitorsToLocalStorage();
                    }
                    else {
                        alert("Phone number must contain only digits, spaces or dashes.");
                    }
                }
                else {
                    alert("Please fill in all fields.");
                }
            }
        };
    }
}

newVisitorBtn.addEventListener("click", () => {
    isEditMode = false;
    const h3 = document.querySelector('.modal-content h3');
    h3.textContent = "New Visitor";

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
    const fullName = formData.get('fullname');
    const phone = formData.get('phone');


    let lastElem = visitors.at(visitors.length-1);
    let id = lastElem ? lastElem.id + 1 : 1;

    if (fullName && phone) {
        if (/^[\d\s-]+$/.test(phone)) {
            const visitor = {
                id: id,
                fullName: fullName,
                phone: phone
            };

            visitors.push(visitor);

            form.reset();
            modal.style = "display: none;";
            renderVisitors();
            writeVisitorsToLocalStorage();
        }
        else {
            alert("Phone number must contain only digits, spaces or dashes.");
        }
    }
    else {
        alert("Please fill in all fields.");
    }
});


readVisitorsFromLocalStorage();