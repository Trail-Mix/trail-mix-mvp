const db = require('../database/database.js');

const userController = { };

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// query fetching all comments for specific trails
userController.getComment = (req, res, next) => {
  const { id } = req.headers;
  db.query('SELECT * FROM comments where id = $1', [id], (error, results) => {
    if (error) throw error;
    res.locals.comments = results.rows;
    return next();
  });
};

//query posting new comment to DB and then fetching all comments including the one just posted
userController.postComment = (req, res, next) => {
  const { author, comment, id } = req.body;

  if(author && comment && id) {
    db.query('INSERT INTO comments (author, comment, id) VALUES ($1, $2, $3)', [author, comment, id], (error, results) => {
    if (error) throw error;
      db.query('SELECT * FROM comments where id = $1', [id], (error, results) => {
        if (error) throw error;
        res.locals.comments = results.rows;
        return next();
      });
    });
  };
};

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

  if (username && password) {
    let results;
    try {
      results = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    } catch(err) {
      return next({
        log: `Error searching for user in db ${err}`
      });
    }

    if (results.rowCount === 0) {
      await bcrypt.hash(password, SALT_WORK_FACTOR, async (err, hash) => {
        if (err) throw err;
        try {
          await db.query('INSERT INTO users (username, password) VALUES ($1, $2) returning *', [username, hash])
        } catch(err) {
          return next({
            log: `Error inserting users into db ${err}`
          })
        }
      });
    }

    res.locals.verified = true;
  } else {
    res.locals.verified = false;
  }
  return next();
};



// query username and password and see if matches are in the database
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  db.query('SELECT password FROM users where username = $1', [username], (error, results) => {
    if (error) throw error;
    if(results.rows.length === 1) {
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

module.exports = databaseController;
