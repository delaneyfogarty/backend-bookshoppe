-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists authors;
DROP table if exists books;
DROP table if exists junction;

CREATE table authors (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR NOT NULL,
	dob DATE NOT NULL,
	pob VARCHAR NOT NULL
);

INSERT INTO authors (name, dob, pob) VALUES
('Toni Morrison', '02/18/1931', 'Lorain, OH'),
('Chimamanda Ngozi Adichie', '09/15/1977', 'Enugu, Nigeria'),
('Margaret Atwood', '11/18/1939', 'Ottawa, Canada'),
('Zadie Smith', '10/25/1975', 'London, UK'),
('Angela Carter', '05/07/1940', 'Eastbourne, UK');

CREATE table books (
		id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		title VARCHAR NOT NULL,
		released INT NOT NULL
);

INSERT INTO books (title, released) VALUES
('Beloved', 1987),
('Song of Solomon', 1977),
('Half of a Yellow Sun', 2006),
('Americanah', 2013),
('The Testaments', 2019),
('Swing Time', 2016),
('NW', 2012),
('The Bloody Chamber', 1979),
('The Magic Toyshop', 1967),
('Nights at the Circus', 1984);

CREATE table junction (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	author_id BIGINT,
	book_id BIGINT,
	FOREIGN KEY (author_id) REFERENCES authors(id),
	FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO junction (author_id, book_id) VALUES
(1,1),
(1,2),
(2,3),
(2,4),
(3,5),
(3,6),
(4,7),
(5,8),
(5,9),
(5,10);