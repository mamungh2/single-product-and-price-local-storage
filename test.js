const addProduct = () => {
    const productName = document.getElementById('product-name');
    const product = productName.value;
    const productPrice = document.getElementById('product-price');
    const price = productPrice.value;
    if (!product || !price) {
        return;
    }
    productName.value = '';
    productPrice.value = '';
    addProductToLocalStorage(product, price);
    displayLocalStorageProduct();
}

const getProduct = () => {
    const productStr = localStorage.getItem('product');
    let productObj;
    if (productStr) {
        productObj = JSON.parse(productStr);
    }
    else {
        productObj = {};
    }
    return productObj;
}

const addProductToLocalStorage = (product, price) => {
    const productObj = getProduct();
    if (productObj[product]) {
        productObj[product] = parseFloat(productObj[product]) + parseFloat(price);
    }
    else {
        productObj[product] = parseFloat(price);
    }
    const productStringified = JSON.stringify(productObj);
    localStorage.setItem('product', productStringified);
}

const displayProduct = (product, price) => {
    const productList = document.getElementById('product-list');
    const li = document.createElement('li');
    li.innerText = product + ' - ' + price;
    productList.appendChild(li);
}

const displayLocalStorageProduct = () => {
    document.getElementById('product-list').textContent = '';
    const productObj = getProduct();
    for (const key in productObj) {
        displayProduct(key, productObj[key]);
    }
}

displayLocalStorageProduct();

// place order
const placeOrder = () => {
    localStorage.removeItem('product');
    location.reload();
}


