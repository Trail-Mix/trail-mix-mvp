const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const trailController = require('../controller/trailController');
const commentsController = require('../controller/commentsController');

const queries = require('../database/queries.js')

const app = express();
const PORT = 3000;

//extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());

//sends index.html file upon entering home page
app.get('/homepage', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// fetches trail data from REI API
app.get('/data', trailController.getTrails, (req, res) => {
  res.status(200).send(res.locals.trails);
})

// fetches hikers associated with a trail
app.post('/hikers', trailController.getHikers, trailController.getHikersInfo, (req, res) => {
  res.status(200).send(res.locals.hikers);
})

// get featured trail
app.post('/trail', trailController.getTrail, commentsController.getComments, (req, res) => {
  res.status(200).send(res.locals);
})

// save trail to user
app.post('/trail/add', trailController.saveTrail, trailController.getUserTrails, (req, res) => {
  res.status(200).send(res.locals);
})

// remove trail from user
app.post('/trail/remove', trailController.removeTrail, trailController.getUserTrails, (req, res) => {
  res.status(200).send(res.locals);
})

// remove trail from user
app.post('/trail/update', trailController.updateTrails, trailController.getUserTrails, (req, res) => {
  res.status(200).send(res.locals);
})

//get route to get usertrails
app.post('/favs', trailController.getUserTrails, (req,res) => {
  res.status(200).send(res.locals)
})

//routes post request upon login to verify user
app.post('/login', queries.verifyUser, (req, res) => {
  return res.status(200).json(res.locals);
})

// post request that brings in user-input signup information, creates a new user in the database, and sends verification to the front end
app.post('/signup', queries.createUser, (req, res) => {
  return res.status(200).json(res.locals);
})

// sends all comments pertaining to trail ID
app.get('/comments', queries.getComment, (req, res) => {
  res.status(200).send(res.locals.comments)
})

//posts new comment in database and sends back all comments pertaining to unique trail ID
app.post('/comments', queries.postComment, (req, res) => {
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
  res.status(errObj.status).json(errObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
