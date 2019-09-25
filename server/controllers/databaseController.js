const db = require('../database/database.js');

const databaseController = { };

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// query fetching all comments for specific trails
databaseController.getComment = async (req, res, next) => {
    console.log("getComment")
  const { id } = req.headers;
  const query = {
      text: 'SELECT * FROM comments where id = $1',
      values: [id],
  };
  try {
      const result = await db.query(query);
      res.locals.comments = results.rows;
      return next();
  } catch (err){
      return next({
          log: `Error in getComment database query: ${err}`,
      });
  }
};

//query posting new comment to DB and then fetching all comments including the one just posted
databaseController.postComment = async (req, res, next) => {
    console.log("postComment")
  const { author, comment, id } = req.body;
  const query = {
      text: 'INSERT INTO comments (author, comment, id) VALUES ($1, $2, $3) RETURNING *',
      values: [author, comment, id],
  };
  try{
      const { rows } = await db.query(query);
      res.locals.comments = rows[0]
  } catch(err){
      return next({
          log: `Error in postComment db query: ${err}`,
      });
  }
};

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
  } catch(err) {
      res.locals.verified = false;
      return next({
          log: `Error in createUser db query: ${err}`
      });
  }
  return next()
};

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
