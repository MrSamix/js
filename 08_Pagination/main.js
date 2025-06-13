const numberInput = document.getElementById('numberInput');

const resultDiv = document.querySelector('.container div')

const saveBtn = document.querySelector('.settings button');

const pagesNav = document.querySelector('.pages nav ul');

let limit = +numberInput.value;

let currentPage = 1;

let skipProducts = 0;

let totalProducts = 0;

function createPaginationButtons(totalProducts) {
    pagesNav.innerHTML = '';
    const totalPages = Math.ceil(totalProducts / limit);
    const prevButton = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
    pagesNav.innerHTML += prevButton;

    let max = 0;
    if (totalPages > 10) {
        max = 10;
    }
    else{
        max = totalPages;
    }

    for (let i = 1; i <= max; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        pagesNav.innerHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#">${i}</a></li>`;
    }

    if (max != totalPages) {
        const dots = `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        pagesNav.innerHTML += dots;
        const activeClass = totalPages === currentPage ? 'active' : '';
        pagesNav.innerHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#">${totalPages}</a></li>`;
    }

    const nextButton = `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;
    pagesNav.innerHTML += nextButton;
}



async function loadProducts()
{
    try {
        resultDiv.innerHTML = '';
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skipProducts}`);
        const data = await response.json();

        let products = data.products;
        totalProducts = data.total;
        createPaginationButtons(totalProducts);

        for (const product of products) {
            resultDiv.innerHTML += `<div class="card col my-1">
                <img src="${product.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                </div>
            </div>`
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        resultDiv.innerHTML = '<h2 class="text-center col-12">Failed to load products</h2>';
    }
}

loadProducts();

saveBtn.addEventListener('click', () => {
    limit = +numberInput.value;
    if (isNaN(limit) || limit <= 0) {
        alert('Please enter a valid number');
        return;
    }
    loadProducts();
});

pagesNav.addEventListener('click', (e) => {
    let number = +e.target.innerText;
    if (!isNaN(number)) {
        currentPage = number;
        skipProducts = (currentPage - 1) * limit;
        setTimeout(loadProducts, 1000);
    }
    else {
        if (e.target.innerText === 'Previous') {
            if (currentPage > 1) {
                currentPage--;
                skipProducts = (currentPage - 1) * limit;
                setTimeout(loadProducts, 1000);
            }
        }
        else if (e.target.innerText === 'Next') {
            if (currentPage < Math.ceil(totalProducts / limit)) 
                {
                    currentPage++;
                    skipProducts = (currentPage - 1) * limit;
                    setTimeout(loadProducts, 1000);
                }
        }
    }
});