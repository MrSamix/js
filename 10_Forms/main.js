const tBody = document.getElementById('product-list');
const form = document.forms.productForm;
const clearBtn = document.getElementById('clearBtn');

const productName = form.elements.name;
const productPrice = form.elements.price;
const productDescription = form.elements.description;
const productQuantity = form.elements.stock;
const productSale = form.elements.sale;

form.onsubmit = function(event) {
    event.preventDefault();
    
    addProduct(
        productName.value,
        productPrice.value,
        productDescription.value,
        productQuantity.value,
        productSale.checked
    );
}


function addProduct(name, price, description, stock, sale) {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td>${description}</td>
        <td>${stock}</td>
        <td>${sale ? 'Yes' : 'No'}</td>
    `;
    
    tBody.appendChild(tr);
    
    form.reset();
}
clearBtn.onclick = function() {
    tBody.innerHTML = '';
    form.reset();
}