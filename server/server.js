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
app.get('/api/homepage', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
  // res.send(res.locals.trails);
})


//   app.get('/data', trailController.getTrails, () => {
//     res.send(res.locals.trails)
//   })

// post request for user infor
app.post("/api/login", queries.verifyUser, (req, res) => {
  const { verified } = res.locals;
  console.log("verified in server ==> ", verified)

  return res.status(200).json(verified);
})

// post request for user signup infor
app.post("/api/signup", queries.createUser, (req, res) => {
  const { createUser } = res.locals;
  console.log("createUser from server ==>", createUser)
  return res.json();
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

  res.sendStatus(errObj.status).json(errorObj.message);
});


//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});