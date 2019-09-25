const db = require('../database/database.js');

const userController = { };

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// query fetching all comments for specific trails
databaseController.getComment = (req, res, next) => {
  const { id } = req.headers;
  db.query('SELECT * FROM comments where id = $1', [id], (error, results) => {
    if (error) throw error;
    res.locals.comments = results.rows;
    return next();
  });
};

//query posting new comment to DB and then fetching all comments including the one just posted
databaseController.postComment = (req, res, next) => {
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

//add user and bcrypt password to database
databaseController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    db.query('SELECT * from users WHERE username = $1', [username], (err, results) => {
      if(results.rows.length === 0) {
        bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
          if (err) throw err;
          db.query('INSERT INTO users (username, password) VALUES ($1, $2) returning *', [username, hash], (error, results) => {
            if (error) throw error;
            res.locals.verified = true;
            return next();
          });
        });
      } else {
        res.locals.verified = false;
            return next();
      };
    });
  };
};

// query username and password and see if matches are in the database
databaseController.verifyUser = (req, res, next) => {
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

module.exports = userController;
