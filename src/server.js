import server from "./app.js"
import { Server } from "socket.io"
import http from 'http';


const PORT = 8080
const serverr = http.createServer(server);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const io = new Server(serverr);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('createProduct', (product) => {

        req.manager.add_product(product);

        io.emit('productCreated', product);
    });

    socket.on('deleteProduct', (productId) => {

        req.manager.destroy_product(productId);

        io.emit('productDeleted', productId);
    });
});
