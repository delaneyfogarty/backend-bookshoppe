-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists authors;
DROP table if exists books;

CREATE table authors (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
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
		id BIGINT GENERATED ALWAYS AS IDENTITY,
		title VARCHAR NOT NULL,
		year INT NOT NULL
);

INSERT INTO books (title, year) VALUES
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