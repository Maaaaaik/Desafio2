import express from 'express';
import { connect } from 'mongoose';
import router from './routes/index.js';
import error_handler from './middlewares/error_handler.js';
import not_found_handler from './middlewares/not_found.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import manager from './managers/Product.js';
import mongoose from 'mongoose';

const server = express();


server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/views');


server.use((req, res, next) => {
    req.manager = manager;
    next();
});


server.use('', express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', router);
server.use(error_handler);
server.use(not_found_handler);

connect('mongodb+srv://Mikel:maik1234@cluster0.tqkzav1.mongodb.net/ecommerce')
    .then(() => console.log("database conected"))
    .catch(err => console.log(err))

export default server;