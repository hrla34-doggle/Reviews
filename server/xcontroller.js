// const helper = require('../database/xdbHelpers.js');
const pool = require('../database/xqueries.js');

// the query is the helper or just dont have a helper

const controller = {
  get: (req, res) => {
    let id = req.params.id 
    pool.query('SELECT * FROM tour JOIN review ON review.tour_id = tour.id WHERE tour.id = $1', [id])
    .then ((data) => {
      let tour = {
        id: parseInt(data.rows[0].id),
        trips: data.rows[0].trips,
        review: []
      };
      let rows = data.rows;
      rows.map(row => {
        delete row.id;
        delete row.trips;
        tour.review.push(row);
      })
      res.status(200).send(tour);
    })
    .catch ((err) => {
      res.status(400).send(err);
    })
  }
}

module.exports = controller;