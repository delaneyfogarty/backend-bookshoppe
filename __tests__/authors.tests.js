const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author');

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

  it('Add a new author', async () => {
    const newAuthor = new Author({
      id: '6',
      name: 'Bell Hooks',
      dob: '09/25/52',
      pob: 'Hopkinsville, KY',
    });
    const res = await request(app).post('/authors').send(newAuthor);
    expect(res.body.id).toEqual(newAuthor.id);
    expect(res.body.name).toEqual(newAuthor.name);
    expect(res.body.dob).toEqual(newAuthor.dob);
    expect(res.body.pob).toEqual(newAuthor.pob);
  });
});
