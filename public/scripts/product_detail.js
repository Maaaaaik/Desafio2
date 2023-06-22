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
        document.getElementById('addCart').addEventListener('click', async () => {
            try {
                const response = await fetch(`/api/cart/${pid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId: pid })
                });

                const result = await response.json();
                if (result.status === 200) {
                    console.log('Producto agregado al carrito');
                } else {
                    console.log('Error al agregar el producto al carrito');
                }
            } catch (error) {
                console.log(error);
            }
        });
    })
    .catch(err => console.log(err));


