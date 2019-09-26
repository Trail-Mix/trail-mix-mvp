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
  res.cookie('ssid', ssid, { httpOnly: true });
  res.locals.cookieId = ssid;
  return next();
}

sessionController.startSession = async (req, res, next) => {
  console.log(res.locals.userId);
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
  if (!req.cookies || !req.cookies.ssid) {
    res.locals.isLoggedIn = false;
    return next();
  }
  try {
    const query = {
      text: `SELECT * FROM sessions WHERE cookie_id = $1`,
      values: [req.cookies.ssid],
    };
    const result = await db.query(query);
    if (result.rowCount !== 1) {
      res.locals.isLoggedIn = false;
      return next();
    }
    res.locals.isLoggedIn = true;
    res.locals.userId = result.rows[0].user_id;
    return next();
  } catch(err) {
    return next({
      log: `Error getting session from db ${err}`
    });
  }
};

module.exports = sessionController;
