const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
