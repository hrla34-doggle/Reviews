const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const port = 3001;
const path = require('path');
var router = require('./router.js')

//attempting

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '../Client/dist/')))
app.use('/', router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))