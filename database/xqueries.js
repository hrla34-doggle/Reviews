const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'kayrub',
  host: 'localhost',
  database: 'kayrubsdc',
  password: '1234',
  port: 5432
})

module.exports = pool;

//when creating xseedData
// keep in mind foreign key and keeping the id the same for every review related to the primary key.