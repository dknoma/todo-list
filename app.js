/*
 * Description: TODO test server. This app will let the user create and delete TODO items
 * 
 * Start application: npm run start:dev
 * Start postgres: pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
 */

//include express module
//express app
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//logs request to the console
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Require our routes into the application.
require('./server/routes')(app);
app.get('*', (request, response) => response.status(200).send({
	message: 'Welcome to the beginning of Wut.',
}));
  
module.exports = app;
