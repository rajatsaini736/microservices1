const express = require('express');
const router = express.Router();
const ORDER = require('../models/order');

router.get('/orders', async (req, res) => {
    let response = await ORDER.find();

    if (!response) response = "no orders found";
    res.send(response);
});

router.get('/order/:id', async (req, res) => {
    let orderId = req.params.id;
    let response = await ODER.findByID(orderId);

    if (!response) response = "no order found";
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