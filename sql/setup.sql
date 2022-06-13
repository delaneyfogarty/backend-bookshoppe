-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists authors;

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