const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    // this.authors = row.authors ?? [];
    row.authors ? (this.authors = row.authors) : null;
  }

  static async getAllBooks() {
    const { rows } = await pool.query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `SELECT
        books.*,
        COALESCE(
          json_agg(to_jsonb(authors))
          FILTER (WHERE authors.id is NOT NULL), '[]'
          ) as authors from books
          LEFT JOIN junction on books.id = junction.book_id
          LEFT JOIN authors on junction.author_id = authors.id
          WHERE books.id = $1
          GROUP BY books.id`,
      [id]
    );
    if (!rows[0]) return null;

    return new Book(rows[0]);
  }

  static async addNewBook({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) RETURNING *',
      [title, released]
    );
    return new Book(rows[0]);
  }
};

// getAllBooks route
// getBooksById route that includes author detail // COALESCE
// postBookById route (insert)
