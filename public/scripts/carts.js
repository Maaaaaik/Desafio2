fetch('/api/carts/')
    .then(res => res.json())
    .then(res => console.log(res))
