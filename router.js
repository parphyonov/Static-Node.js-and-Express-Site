// requiring express
const express = require('express');
// and making a router out of it
const router = express.Router();

// and for the reasons of modularity create an error handling module
const errorHandler = require('./errorHandler');

// NOT DATA, but projects
const { projects } = require('./data/projects.json');
// and also information about me to be injected into pug templates is in the separate file
const { developer } = require('./data/developer.json');

// index route
router.get('/', (req, res) => {
  res.render('index', { developer, projects });
});

// about route
router.get('/about', (req, res) => {
  res.render('about', { developer });
});

// I want project(singular)/id so I set it to be this way
router.get('/project/:projectID', (req, res) => {
  // getting an id from params
  const projectID = req.params.projectID;
  // and performing a check if the project number is outside of the limits of existing projects
  if (projectID <= 0 || projectID > projects.length) {
    // and if it is, redirect to error
    res.redirect('/error');
  } else {
    // otherwise I render project template and handle the data to it
    res.render('project', { developer, project: projects[projectID - 1] });
  }
});

// error route
router.get('/error', (req, res) => {
  // we throw and error
  const error = errorHandler.throwPageNotFoundError(req, res);
  // and pass it to our new error template, along with the error data
  res.render('error', { developer, error });
});

// and we also handle any errors
router.use('/', (req, res, next) => {
  res.redirect('/error');
});

// and finally exports the router
module.exports = router;
