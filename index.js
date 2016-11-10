const express = require('express'),
      morgan = require('morgan'),
      bodyParser= require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('Kevin', 'Kevin', '', { dialect: 'postgres' });

var moviesRouter = require('./routes/movies');

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }})
);

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.redirect('/movies');
});

app.use('/movies', moviesRouter);


// app.get('/movies', (request, response) => {
//   Movie.findAll().then((movies) => {
//     response.render('movies/index', { movies: movies });
//   });
// });
//
// app.post('/movies', (request, response) => {
//   Movie.create(request.body).then(() => {
//       response.redirect('/movies');
//   });
// });
//
// app.get('/movies/new', (request, response) => {
//   response.render('movies/new');
// });
//
// app.get('movies/:id/edit', (request, response) => {
//   Movie.findById(request.params.id).then((book) => {
//     response.render('movies/edit', { movie: movie });
//   });
// });

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
