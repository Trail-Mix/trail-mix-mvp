const db = require('../database/database.js');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  Session.findOne({cookieId: req.cookies.ssid}, (error, session) => {
    if (error || !session) {
      res.locals.isLoggedIn = false;
    } else {
      res.locals.isLoggedIn = true;
    }
    return next();
  });
};

sessionController.createSessionsTable = (req, res, next) => {
  const table = `CREATE TABLE IF NOT EXISTS sessions
                (_id SERIAL PRIMARY KEY,
                 cookie_id VARCHAR,
                 created_at TIMESTAMP)`;

  db.query(table, null, (err, results) => {
   if (err) throw err;
  });

  return next();
}

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = (req, res, next) => {
  //write code here
  Session.create({cookieId: res.locals.id}, (error, session) => {
    if (error) {
      res.json(error);
    } else {
      return next();
    }
  });
};

module.exports = sessionController;
