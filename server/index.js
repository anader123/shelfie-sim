require('dotenv').config();
const express = require('express'); 
const massive = require('massive'); 
const app = express(); 
const cors = require('cors');

// Require controllers 
const ctrl = require('./controller'); 

// TLM
app.use(express.json()); 
app.use(cors());

// .ENV variables 
const {
    CONNECTION_STRING, 
    SEVER_PORT
} = process.env; 

// Massive connection
massive(CONNECTION_STRING).then((dbInstance) => {
    app.set('db', dbInstance); 
    console.log('Database Connected'); 
})


// Endpoints 
app.get('/api/inventory', ctrl.getInventory); 
app.post('/api/product', ctrl.createProduct); 
app.delete('/api/products/:id', ctrl.deleteProduct)

app.listen(SEVER_PORT, () => console.log(`Server is running on ${SEVER_PORT}`));  