const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const trailController = require('../controller/trailController');
const queries = require('../database/queries.js')

const app = express();
const PORT = 3000;

//extract the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());

//sends homePage file upon entering home page
app.get('/homepage', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

//fetches data from REI API
app.get('/data', trailController.getTrails, (req, res) => {
  res.status(200).send(res.locals.trails);
})

// post request for user infor
app.post('/login', queries.verifyUser, (req, res) => {
  const { verified } = res.locals;
  return res.status(200).json(verified);
})

// post request for user signup infor
app.post('/signup', queries.createUser, (req, res) => {
  const { verified } = res.locals;
  return res.status(200).json(verified);
})

app.post('/comments', queries.getComment, (req, res) => {
  res.status(200).send(res.locals.comments)
})

// catch-all route handler for any requests to an unknown route
app.all('*', (req, res) => {
  res.sendStatus(404);
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errObj = Object.assign((defaultErr, err));
  console.log(errObj.log);

  res.status(errObj.status).json(errorObj.message);
});


//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});