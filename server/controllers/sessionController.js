const db = require('../database/database.js');
const uuid = require('uuidv4').default;

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
                 user_id INT,
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
sessionController.startSession = async (req, res, next) => {
  const ssid = uuid();

  try {
    await db.query('INSERT INTO sessions (cookie_id, user_id, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) returning *', [ssid, res.locals.userId]);
  } catch(err) {
    return next({
      log: `Error inserting users into db ${err}`
    })
  }

  res.locals.cookie_id = ssid;

  return next();
};

module.exports = sessionController;
