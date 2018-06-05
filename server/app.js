//include http module
// const http = require('http');
//include express module
//express app
const express = request('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//logs request to the console
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('*', (request, response) => response.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));
  
module.exports = app;






// Create the server. Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.

// http.createServer(function (request, response) {
// }).listen(8322);