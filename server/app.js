const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoute = require('../routes/api.js')

const {db} = require('../models');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//logging middleware
app.use(morgan('dev'))

app.use('/api', apiRoute);
// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send(
    console.log('sending this message')
  );
});



// listen on a port
const port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});



