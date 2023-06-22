const params = new URLSearchParams(location.search);
const pid = params.get('id');

fetch('/api/products/' + pid)
    .then(res => res.json())
    .then(res => {
        let template =
            `
        <div class="product-card">
            <img src="${res.product.thumbnail}" alt="Producto">
            <h2 class="product-title">${res.product.title}</h2>
            <p class="product-price">$${res.product.price}</p>
            <p class="product-description">${res.product.description}</p>
            <input type="number">
            <input id="addCart" type="submit" value="add to cart">
        </div>
        `;
        document.getElementById('product').innerHTML = template;
    })
    .catch(err => console.log(err));

let addCart = document.getElementById('addCart')
addCart.addEventListener(event => (
    fetch('
    method: PUT')

    ))