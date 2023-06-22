document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var code = parseInt(document.getElementById("code").value);
    var stock = parseInt(document.getElementById("stock").value);
    var category = document.getElementById("category").value;
    var thumbnail = document.getElementById("thumbnail").value;
    var price = parseFloat(document.getElementById("price").value);

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