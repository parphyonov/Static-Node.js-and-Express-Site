const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/static', express.static('public'));

const routes = require('./router');
app.use(routes);

app.listen(3000, () => {
  console.log('Up and running at localhost, port 3000!');
});
