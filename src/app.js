import express from 'express';
import { connect } from 'mongoose';
import router from './routes/index.js';
import error_handler from './middlewares/error_handler.js';
import not_found_handler from './middlewares/not_found.js';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import manager from './managers/Product.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import expressSession from 'express-session';
import mongoStore from 'connect-mongo';
import morgan from 'morgan'
import session from 'express-session';

const server = express();


server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/views');


server.use((req, res, next) => {
    req.manager = manager;
    next();
});

server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGO,
        ttl: 30000
    })
}))
server.use(cookieParser())
server.use('', express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', router);
server.use(error_handler);
server.use(not_found_handler);
server.use(morgan('dev'))


connect('mongodb+srv://Mikel:maik1234@cluster0.tqkzav1.mongodb.net/ecommerce')
    .then(() => console.log("database conected"))
    .catch(err => console.log(err))

export default server;