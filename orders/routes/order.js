const express = require('express');
const router = express.Router();
const ORDER = require('../models/order');
const fetch = require('node-fetch');

router.get('', (req, res) => {
    res.send('Order microservice is running');
});

router.get('/orders', async (req, res) => {
    let response = await ORDER.find().lean();

    if (!response.length) response = "no orders found";
    res.send(response);
});

router.get('/order/:id', async (req, res) => {
    let orderId = req.params.id;
    let response = await ORDER.findById(orderId).lean();
    if (!response) {
        response = "no order found";
        res.send(response);
    };

    let bookId = response.bookId;
    let customerId = response.customerId;

    // let bookResObj = await fetch(`http://localhost:8000/bookservice/book/${bookId}`);
    let bookResObj = await fetch(`http://localhost:8080/bookservice/book/${bookId}`);
    try{
        bookResObj = await bookResObj.json();        
    } catch(err) {
        console.log(err);
        bookResObj = null
    }
    response = Object.assign({}, response, { book: bookResObj ? bookResObj.title : null});

    // let customerObj = await fetch(`http://localhost:4000/customerservice/customer/${customerId}`);
    let customerObj = await fetch(`http://localhost:8080/customerservice/customer/${customerId}`);
    try{
        customerObj = await customerObj.json();
    } catch(err) {
        console.log(err);
        customerObj = null;
    }
    response = Object.assign({}, response, { cutomer: customerObj ? customerObj.name : null});
    res.send(response);
});

router.post('/neworder', async (req, res) => {
    let { customerId, bookId, initialDate, deliveryDate } = req.body;
    let response = await ORDER.create({customerId, bookId, initialDate, deliveryDate});
    
    res.send(response);
});

router.delete('/order/:id', async (req, res) => {
    let orderId = req.params.id;
    let response = await ORDER.deleteOne({_id: orderId});

    res.send(response);
});

module.exports = router;