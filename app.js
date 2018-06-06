//include http module
// const http = require('http');
//include express module
//express app
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// to start postgres server: pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
//logs request to the console
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('*', (request, response) => response.status(200).send({
	message: 'Welcome to the beginning of nothingness.',
}));
  
module.exports = app;
