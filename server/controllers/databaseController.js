const db = require('../database/database.js');

const databaseController = { };

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');



//add user and bcrypt password to database
databaseController.createUser = async (req, res, next) => {
  console.log("createUser")
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);
  const query = {
      text: 'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *',
      values: [username, hash],
  };
  try {
      const { rows } = await db.query(query);
      res.locals.users = rows[0];
      res.locals.verified = true
      console.log('r',res.locals.verified)
  } catch(err) {
      res.locals.verified = false;
      console.log("res", res.locals.verified)
      return next({
          log: `Error in createUser db query: ${err}`
      });
  }
  return next()
};

databaseController.findUser = async(req, res, next) => {
  console.log("Finding a user")

  return next();
}

// query username and password and see if matches are in the database
databaseController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  db.query('SELECT password FROM users where username = $1', [username], (error, results) => {
    if (error) throw error;
    if(results.rows.length) {
      bcrypt.compare(password, results.rows[0].password, (err, isMatch) => {
        if (err) return err;
        if (!isMatch) {
          res.locals.verified = false;
          return next();
        } else {
          res.locals.verified = true;
          return next();
        };
      });
    } else {
      res.locals.verified = false;
      return next();
    };
  });
};

module.exports = databaseController
