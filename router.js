const express = require('express');

const router = express.Router();

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
    const limitError = new Error('The requested page does not exist.');
    res.status(404);
    res.render('error', { developer, error: limitError });
  } else {
    res.render('project', { developer, project: projects[projectID - 1] });
  }
})

module.exports = router;
