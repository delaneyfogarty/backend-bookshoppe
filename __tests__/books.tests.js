const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

const { books } = require('../data/books-data');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/books should return a list of books', async () => {
    const res = await request(app).get('/books');
    const expected = books.map((book) => {
      return { id: book.id, title: book.title, released: book.released };
    });
    expect(res.body).toEqual(expected);
  });

  it('/books/:id should return one book from the list', async () => {
    const res = await request(app).get('/books/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual('1');
    expect(res.body.title).toEqual('Beloved');
    expect(res.body).toHaveProperty('authors');
  });
  afterAll(() => {
    pool.end();
  });

  it('Add a new book', async () => {
    const newBook = new Book({
      id: '11',
      title: 'Feminism is for Everybody',
      released: 2000,
    });
    const res = await request(app).post('/books').send(newBook);
    expect(res.body.id).toEqual(newBook.id);
    expect(res.body.title).toEqual(newBook.title);
    expect(res.body.released).toEqual(newBook.released);
  });
});
