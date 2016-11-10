const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      Sequelize = require('sequelize');
      router = express.Router();

const sequelize = new Sequelize('Kevin', 'Kevin', '', { dialect: 'postgres' });

var Movie = sequelize.define('movie', {
  title: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  director: Sequelize.STRING,
  description: Sequelize.TEXT
});

router.get('/', (request, response) => {
  Movie.findAll({ order:'id ASC'}).then((movies) => {
    response.render('movies/index', { movies: movies });
  });
});


router.get('/new', (request, response) => {
  response.render('movies/new');
});

router.get('/:id', (request, response) => {
  Movie.findById(request.params.id).then((movie) => {
    response.render('movies/show', { movie: movie });
  });
});

router.get('/:id/edit', (request, response) => {
  Movie.findById(request.params.id).then((movie) => {
    response.render('movies/edit', { movie: movie });
  });
});

router.post('/', (request, response) => {
  if (request.body.title) {
    Movie.create(request.body).then(() => {
      response.redirect('/movies');
    });
  } else {
    response.redirect('/movies/new');
  }
});


router.put('/:id', (request, response) => {
  Movie.update(request.body, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/movies/' + request.params.id);
  });
});

router.delete('/:id', (request, response) => {
  Movie.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/movies');
  });
});


module.exports = router;
