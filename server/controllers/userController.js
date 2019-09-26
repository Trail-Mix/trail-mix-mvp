const db = require('../database/database.js');

const userController = { };

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

userController.createTable = (req, res, next) => {
  const table = `CREATE TABLE IF NOT EXISTS users
                (_id SERIAL PRIMARY KEY,
                 username VARCHAR,
                 password VARCHAR)`;

  db.query(table, null, (err, results) => {
    if (err) throw err;
  });

  return next();
}

//add user and bcrypt password to database
userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: `No username or password in body`,
    });
  }
  try {
    const results = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (results.rowCount) {
      return next({
        log: `User already exists`,
      });
    }
    const hashedPass = await bcrypt.hash(password, SALT_WORK_FACTOR);
    const { rows } = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) returning *', [username, hashedPass]);
    res.locals.userId = rows[0]._id;
    res.locals.verified = true;
    return next();
  } catch(err) {
    res.locals.verified = false;
    return next({
      log: `Error searching for user in db ${err}`
    });
  }
};

// query username and password and see if matches are in the database
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  const badUserError = {
    log: `User is not in DB`,
    status: 400,
    message: `Username or password is incorrect`,
  };
  try {
    const results = await db.query('SELECT * FROM users WHERE username = $1', [username])
    if (!results.rowCount) {
      res.locals.verified = false;
      return next(badUserError);
    }
    const isMatch = await bcrypt.compare(password, results.rows[0].password);
    res.locals.verified = isMatch;
    if (!isMatch) return next(badUserError);
    res.locals.username = username;
    res.locals.userId = results.rows[0]._id;
    return next();
  } catch(err) {
    return next({
      log: `verifyUser error: ${err}`,
      status: 400,
      message: `user is not logged in`,
    })
  }
};

userController.findUsername = async (req, res, next) => {
  if (!res.locals.isLoggedIn) return next();
  const query = {
    text: `SELECT username FROM users WHERE _id = $1`,
    values: [res.locals.userId],
  };
  try {
    const { rows } = await db.query(query);
    res.locals.username = rows.username;
    return next();
  } catch (error) {
    return next({
      log: `findUsername error: ${err}`,
    });
  }
}

module.exports = userController;
