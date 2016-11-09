const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');

var app = express();

app.use(morgan('dev'));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.redirect('/movies');
});

app.get('/movies', (request, response) => {
  response.render('./movies/index');
});

app.get('/movies/new', (request, response) => {
  response.render('./movies/new');
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});
