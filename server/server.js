const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const trailController = require('../controller/trailController');

const app = express();
const PORT = 3000;

//extract the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());

//sends homePage file upon entering home page


  app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../index.html'));
  
  })

  app.get('/data', trailController.getTrails, (req, res) => {
    res.send(res.locals.trails)
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