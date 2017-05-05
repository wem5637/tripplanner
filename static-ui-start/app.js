const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { db, Hotel, Restaurant, Activity } = require('./db');

const app = express();

// body parser and logging middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// set up nunjucks for rendering
nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

// serve up public dir statically
app.use(express.static('public'));

// root path
app.get('/', (req, res, next) => {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
    .then(attractions => {
      const [ hotels, restaurants, activities ] = attractions;
      res.render('index', {
        hotels,
        restaurants,
        activities,
      });
    })
    .catch(next);
});

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .render('error', { message: 'uh oh!' });
});

db.sync()
.then(() => {
  app.listen(3000, () => {
    console.log('Listening on 3000');
  });
});
