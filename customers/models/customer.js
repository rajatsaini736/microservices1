const mongoose = require('mongoose');

const CUSTOMER_SCHEMA = new mongoose.Schema({
    name: { type: String, required: true},
    age: { type: Number, required: true},
    address: { type: String, required: true}
});

module.exports = mongoose.model('cutomer', CUSTOMER_SCHEMA);