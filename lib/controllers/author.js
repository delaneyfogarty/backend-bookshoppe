const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const allAuthors = await Author.getAllAuthors();
    res.json(allAuthors);
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const singleAuthor = await Author.getAuthorById(id);
    res.json(singleAuthor);
  });
