document.getElementById('login').addEventListener('click', (event) => {
    event.preventDefault()
    let data = {
        mail: document.querySelector('#mail').value,
        password: document.querySelector('#password').value,
    }
    console.log(data)
    fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
})