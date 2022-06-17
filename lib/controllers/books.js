const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newBook = await Book.addNewBook(req.body);
      res.json(newBook);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const singleBook = await Book.getBookById(id);
    res.json(singleBook);
  })

  .get('/', async (req, res) => {
    const allBooks = await Book.getAllBooks();
    res.json(allBooks);
  });
