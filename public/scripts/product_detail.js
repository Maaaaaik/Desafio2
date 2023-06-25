const params = new URLSearchParams(location.search);
const pid = params.get('id');

fetch('/api/products/' + pid)
    .then(res => res.json())
    .then(res => {
        let template =
            `
        <div class="product-detail">
            <img class="product-detail-img" src="${res.product.thumbnail}" alt="Producto">
            <h2 class="product-detail-title">${res.product.title}</h2>
            <p class="product-detail-price">$${res.product.price}</p>
            <p class="product-detail-description">${res.product.description}</p>
            <div class="product-detail-button"><input type="number">
            <input class="button" id="addCart" type="submit" value="Add to cart">
            </div>
            
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


