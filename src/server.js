// src/server.js

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import bodyParser from 'body-parser';
var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/sf_movies');

var SFSchema = new mongoose.Schema({
  title: String,
  location: String,
  year: String,
  loc: [Number, Number]
}, { collection : 'movies_locations' });

SFSchema = mongoose.model('SFSchema', SFSchema);

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.get('/api/movies/:neLat/:neLng/:swLat/:swLng', (req, res) => {
  var nw = []

  var geometryJson = {
    type: 'Polygon',
    coordinates: [
      [
        [req.params.swLng, req.params.neLat],
        [req.params.neLng, req.params.neLat],
        [req.params.neLng, req.params.swLat],
        [req.params.swLng, req.params.swLat],
        [req.params.swLng, req.params.neLat],
      ]
    ]
  };


  var query = SFSchema.find({ loc: { $within: { $geometry: geometryJson }}});
  query.select('loc title location');

  query.exec(function (err, movies) {
    if (err) {
      return res.send('error ' + err);
    }
    else {
      return res.json(movies);
    }
  })
});

// universal routing and rendering
app.get('/map', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        //markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });

    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
