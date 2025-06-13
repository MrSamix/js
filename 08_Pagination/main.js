const numberInput = document.getElementById('numberInput');

const resultDiv = document.querySelector('.container div')

const saveBtn = document.querySelector('.settings button');

const pagesNav = document.querySelector('.pages nav ul');

let limit = +numberInput.value;

async function loadProducts()
{
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        return data.products; // this
    } catch (error) {
        console.error('Error fetching products:', error);
        resultDiv.innerHTML = '<h2 class="text-center col-12">Failed to load products</h2>';
    }
}

console.log(loadProducts());

saveBtn.addEventListener('click', () => {
    limit = +numberInput.value;
    if (isNaN(limit) || limit <= 0) {
        alert('Please enter a valid number');
        return;
    }
    console.log(limit);
    
    
});