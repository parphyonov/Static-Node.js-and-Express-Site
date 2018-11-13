const express = require('express');

const router = express.Router();

const errorHandler = require('./errorHandler');

const { projects } = require('./data/projects.json');
const { developer } = require('./data/developer.json');

router.get('/', (req, res) => {
  res.render('index', { developer, projects });
});

router.get('/about', (req, res) => {
  res.render('about', { developer });
});

router.get('/project/:projectID', (req, res) => {
  const projectID = req.params.projectID;
  if (projectID <= 0 || projectID > projects.length) {
    res.redirect('/error');
  } else {
    res.render('project', { developer, project: projects[projectID - 1] });
  }
});

router.get('/error', (req, res) => {
  const error = errorHandler.throwPageNotFoundError(req, res);
  res.render('error', { developer, error });
});

router.use('/', (req, res, next) => {
  res.redirect('/error');
});

module.exports = router;
