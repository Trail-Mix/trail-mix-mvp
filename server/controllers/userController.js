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

  const results = await db.query('SELECT * FROM users WHERE username = $1', [username])

  if (results.rowCount === 1) {
    res.locals.userId = results.rows[0]._id;

    bcrypt.compare(password, results.rows[0].password, async (err, isMatch) => {
       if (err) return err;
       if (await isMatch) {
         res.locals.verified = true;
       } else {
         res.locals.verified = false;
       }
     });
  } else {
    res.locals.verified = false;
  }

  return next();
};

module.exports = userController;
