const express = require('express');
const router = express.Router();
const ORDER = require('../models/order');
const fetch = require('node-fetch');

router.get('/orders', async (req, res) => {
    let response = await ORDER.find();

    if (!response) response = "no orders found";
    res.send(response);
});

router.get('/order/:id', async (req, res) => {
    let orderId = req.params.id;
    let reponse;
    response = await ORDER.findById(orderId).lean();

    if (!response) response = "no order found";

    let bookId = response.bookId;
    let customerId = response.customerId;

    let bookResObj = await fetch(`http://localhost:8000/book/${bookId}`);
    bookResObj = await bookResObj.json();
    response = Object.assign({}, response, { book: Object.entries(bookResObj).length ? bookResObj.title : null});

    let customerObj = await fetch(`http://localhost:4000/customer/${customerId}`);
    customerObj = await customerObj.json();
    response = Object.assign({}, response, { cutomer: Object.entries(customerObj).length ? customerObj.name : null});
    console.log(response);
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
    const fetch = require('node-fetch'); 

    res.send(response);
});

module.exports = router;