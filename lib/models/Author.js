const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    row.books ? (this.books = row.books) : null;
  }

  static async getAllAuthors() {
    const { rows } = await pool.query('SELECT id, name FROM authors;');
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `SELECT
        authors.*,
        COALESCE(
          json_agg(to_jsonb(books))
          FILTER (WHERE books.id is NOT NULL), '[]'
          ) as books from authors
          LEFT JOIN junction on authors.id  = junction.author_id
          LEFT JOIN books on junction.book_id = books.id
          WHERE authors.id = $1
          GROUP BY authors.id`,
      [id]
    );
    if (!rows[0]) return null;

    return new Author(rows[0]);
  }

  static async addNewAuthor({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) RETURNING *',
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }
};
