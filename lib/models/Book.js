const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAllBooks() {
    const { rows } = await pool.query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      'SELECT title, released FROM books WHERE id=$1',
      [id]
    );
    if (!rows[0]) return null;

    return new Book(rows[0]);
  }
};
