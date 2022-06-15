const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const { authors } = require('../data/authors-data');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    const expected = authors.map((author) => {
      return { id: author.id, name: author.name };
    });
    expect(res.body).toEqual(expected);
  });

  it('/authors/:id should return one author from the list', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual('1');
    expect(res.body.name).toEqual('Toni Morrison');
    expect(res.body).toHaveProperty('books');
  });

  // it('POST /authors should create a new author with an associated book', async () => {
  //   const res = await (
  //     await request(app).post('/authors')
  //   ).send({
  //     name: 'Loretta Lynn',
  //     bookIds: [1, 2],
  //   });
  // });
});
