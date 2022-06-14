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
    const toni = {
      id: '1',
      name: 'Toni Morrison',
      dob: '1931-02-18T08:00:00.000Z',
      pob: 'Lorain, OH',
    };
    expect(res.body).toEqual(toni);
  });
  afterAll(() => {
    pool.end();
  });
});
