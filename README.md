# Ratquest Trace Express.js SDK 

```
import { ratquestMiddleware } from 'ratquest-express';
imoprt express from 'express';

const app = express();

app.use(ratquestMiddleware({
    service: "your-service-name", // authentication-service
    collectorUrl: "ratquest-server hosted url", // http://localhost:3000 if dev
    apiKey: "your-api-key",
    debug: true, // logout error if testing 
}));

app.get('/', async (req, res) => {
    res.send({
        "hello": "world"
    })
})


app.listen(8000, () => {
    console.log("server listening at http://localhoast:8000")
})
```

## connectMicro

```
import { ratquestMiddleware, connectMicro } from 'ratquest-express';
imoprt express from 'express';

const app = express();
const callService = connectMicro();

app.use(ratquestMiddleware({
    service: "your-service-name", // authentication-service
    collectorUrl: "ratquest-server hosted url", // http://localhost:3000 if dev
    apiKey: "your-api-key",
    debug: true, // logout error if testing 
}));

orders = []

app.post('/api/orders', async (req, res) => {
    try {
        const postData = req.body;
        const newOrder = {
            id: orders.length + 1,
            item: postData.item,
            quantity: postData.quantity
        };
        // check wheather product service has the item in stock
        const productService = await callService(`http://localhost:8081/api/products/${postData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const productData = await productService.json();
        productData.quantity - postData.quantity >= 0 ?
            orders.push(newOrder) : res.status(400).send({ error: "Insufficient stock "});

        res.send({ order: newOrder });

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", details: error.message + error.stack })
    }
})


app.listen(8000, () => {
    console.log("server listening at http://localhoast:8000")
})
```