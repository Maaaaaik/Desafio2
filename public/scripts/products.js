fetch('/api/products?page=1')
  .then(res => res.json())
  .then(res => {
    const currentPage = res.products.page;
    const totalPages = res.products.totalPages;

    // Renderizar los productos
    const productTemplate = res.products.docs.map(product => `
      <div class="product-card">
        <img src="${product.thumbnail}" alt="Producto">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$${product.price}</p>
        <p class="product-description">${product.description}</p>
        <a href="/product_detail.html?id=${product._id}" class="view-more-button">Ver más</a>
      </div>
    `).join('');

    // Renderizar el botón de navegación hacia atrás
    const prevButton = `<button onclick="navigateToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>`;

    // Renderizar el botón de navegación hacia adelante
    const nextButton = `<button onclick="navigateToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>`;

    // Renderizar los productos y los botones de navegación
    const template = `
      <div id="products">
        ${productTemplate}
      </div>
      <div id="pagination">
        ${prevButton}
        ${nextButton}
      </div>
    `;

    document.getElementById('home').innerHTML = template;
  })
  .catch(err => console.log(err));

// Función para navegar a una página específica
function navigateToPage(pageNumber) {
  fetch(`/api/products?page=${pageNumber}`)
    .then(res => res.json())
    .then(res => {
      const currentPage = res.products.page;
      const totalPages = res.products.totalPages;

      // Renderizar los productos
      const productTemplate = res.products.docs.map(product => `
        <div class="product-card">
          <img src="${product.thumbnail}" alt="Producto">
          <h2 class="product-title">${product.title}</h2>
          <p class="product-price">$${product.price}</p>
          <p class="product-description">${product.description}</p>
          <a href="/product_detail.html?id=${product._id}" class="view-more-button">Ver más</a>
        </div>
      `).join('');
      const prevButton = `<div class="button" onclick="navigateToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Anterior</div>`;
      const nextButton = `<div class="button" onclick="navigateToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</div>`;
      const template = `
        <div id="products">
          ${productTemplate}
        </div>
        <div id="pagination">
          ${prevButton}
          ${nextButton}
        </div>
      `;

      document.getElementById('home').innerHTML = template;
    })
    .catch(err => console.log(err));
}