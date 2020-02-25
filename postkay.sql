DROP DATABASE kayrubsdc;
CREATE DATABASE kayrubsdc;

\c kayrubsdc;

CREATE TABLE tour (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  trips VARCHAR(50) NOT NULL
);

CREATE TABLE review (
  name VARCHAR(50),
  score INTEGER,
  description VARCHAR(255),
  likes INTEGER,
  time INTEGER,
  customerScore INTEGER,
  customerReview VARCHAR(255),
  quotes VARCHAR(255),
  tour_id INTEGER REFERENCES tour(id)
);



