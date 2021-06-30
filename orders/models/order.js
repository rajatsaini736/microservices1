const mongoose = require('mongoose');

const ORDER_SCHEMA = new mongoose.Schema({
    customerId: { type: mongoose.SchemaTypes.ObjectId, required: true},
    bookId: { type: mongoose.SchemaTypes.ObjectId, required: true},
    initialDate: { type: Date, required: true},
    deliveryDate: { type: Date, required: true}
});

module.exports = new mongoose.model('orders', ORDER_SCHEMA);