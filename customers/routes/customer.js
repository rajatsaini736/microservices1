const express = require('express');
const router = express.Router();
const CUSTOMER = require('../models/customer');

router.get('/customers', async (req, res) => {
    let response = await CUSTOMER.find().lean();
    if (!response.length) response = "no customer found";
    res.send(response);
});

router.get('/customer/:id', async (req, res) => {
    let customerId = req.params.id;
    let response = await CUSTOMER.findById(customerId).lean();
    if (!response) response = "no customer found";
    res.send(response);
});

router.post('/addcustomer', async (req, res) => {
    const { name, age, address } = req.body;
    let response = await CUSTOMER.create({name, age, address});
    res.send(response);
});

router.delete('/customer/:id', async (req, res) => {
    let customerId = req.params.id;
    let response = await CUSTOMER.deleteOne({_id: customerId});
    res.send(response);
});

module.exports = router;
