document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let code = parseInt(document.getElementById("code").value);
    let stock = parseInt(document.getElementById("stock").value);
    let category = document.getElementById("category").value;
    let thumbnail = document.getElementById("thumbnail").value;
    let price = parseFloat(document.getElementById("price").value);

    fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            code: code,
            stock: stock,
            category: category,
            thumbnail: thumbnail,
            price: price
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Producto enviado exitosamente:", data);
        })
        .catch(error => {
            console.error("Error al enviar el producto:", error);
        });
});