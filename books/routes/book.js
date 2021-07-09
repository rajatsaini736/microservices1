const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('', (req, res) => {
    res.send('Book microservice is live');
})

router.get('/book/:id', async (req, res) => {
    let bookId = req.params.id;
    let response = await Book.findById(bookId).lean();

    if (!response) response = "book not found";
    res.send(response);
});

router.get('/books', async (req, res) => {
    let response = await Book.find().lean();
    if (!response.length) response = "no book is there";
    res.send(response);
});

router.post('/addbook', async (req, res) => {
    let { title, author, numberPages, publisher } = req.body;
    numberPages = Number(numberPages);
    let response = await Book.create({title, author, numberPages, publisher});
    res.send(response);
}); 

router.delete('/book/:id', async (req, res) => {
    let bookId = req.params.id;
    let response = await Book.deleteOne({_id: bookId});
    res.send(response);
});

module.exports = router;