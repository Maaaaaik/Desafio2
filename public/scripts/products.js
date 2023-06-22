fetch('/api/products')
    .then(res => res.json())
    .then(res => {
        let templates = res.products.map(each => {
            let template = `
        <div class="product-card">
            <img src="${each.thumbnail}" alt="Producto">
                <h2 class="product-title">${each.title}</h2>
                <p class="product-price">$${each.price}</p>
                <p class="product-description">${each.description}</p>
                <a href="/product_detail.html?id=${each._id}" class="view-more-button">Ver más</a>
    </div>
    `
            return template
        }).join('')
        document.getElementById("home").innerHTML = templates
    })
    .catch(err => console.log(err))