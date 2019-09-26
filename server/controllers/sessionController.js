const db = require('../database/database.js');
const uuid = require('uuidv4').default;

const sessionController = {};

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

sessionController.setSSIDCookie = (req, res, next) => {
  const ssid = uuid();
  res.cookie('ssid', ssid, {httpOnly: true});
  res.locals.cookieId = ssid;
  return next();
}

sessionController.startSession = async (req, res, next) => {
  try {
    await db.query('INSERT INTO sessions (cookie_id, user_id, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) returning *', [res.locals.cookieId, res.locals.userId]);
  } catch(err) {
    return next({
      log: `Error inserting users into db ${err}`
    })
  }

  return next();
};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = async (req, res, next) => {
  console.log('cookies', req.cookies);
  try {
    if (req.cookies) {
      let result;
      result = await db.query(`SELECT * FROM sessions WHERE cookie_id = ${req.cookies.ssid}`);
      if (result.rowCount === 1) {
        res.locals.isLoggedIn = true;
        res.redirect('/homepage');
      } else {
        res.locals.isLoggedIn = false;
        return next();
      }
    }
  } catch(err) {
    return next({
      log: `Error getting session from db ${err}`
    })
  }
};

module.exports = sessionController;
