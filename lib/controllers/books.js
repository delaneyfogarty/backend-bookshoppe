const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const singleBook = await Book.getBookById(id);
    res.json(singleBook);
  })

  .get('/', async (req, res) => {
    const allBooks = await Book.getAllBooks();
    res.json(allBooks);
  });
