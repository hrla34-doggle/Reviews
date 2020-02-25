require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./xrouter.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '../Client/dist/')))
app.use('/', router)

app.listen(port, () => { console.log(`Kayrub running on port ${port}.`)});