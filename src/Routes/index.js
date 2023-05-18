import { Router } from "express"
import api_router from './api/index.js'


const index_router = Router()

index_router.get('/', (req, res) => {
    const products = req.manager.read_products();

    const formattedProducts = products.map((product) => {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: product.status,
            thumbnail: product.thumbnail,
            price: product.price,
        };
    });

    res.render('index', { products: formattedProducts });
});

index_router.get('/realtimeproducts', (req, res) => {
    const products = req.manager.read_products();

    res.render('realTimeProducts', { products });
});

index_router.use('/api', api_router)

export default index_router