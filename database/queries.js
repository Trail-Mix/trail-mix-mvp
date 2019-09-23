const { Pool } = require('pg');
const path = require('path')
const pool = new Pool({
  connectionString: 'postgres://hiiudcpk:Ozq8Ezo4e1c0HZGONL6i2M5_PmHDKUMV@salt.db.elephantsql.com:5432/hiiudcpk'
});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// query fetching all comments for specific trails
const getComment = (req, res, next) => {
  const { id } = req.headers;
  // console.log(req.headers)
  pool.query('SELECT * FROM comments where id = $1', [id], (error, results) => {
    if (error) throw error
    // console.log("results", results)
    res.locals.comments = results.rows
    return next();
  })
}

//query posting new comment to DB and then fetching all comments including the one just posted
const postComment = (req, res, next) => {
  const { author, comment, id } = req.body;
  
  if(author && comment && id) {
    pool.query('INSERT INTO comments (author, comment, id) VALUES ($1, $2, $3)', [author, comment, id], (error, results) => {
    if (error) throw error;
    pool.query('SELECT * FROM comments where id = $1', [id], (error, results) => {
      if (error) throw error
      res.locals.comments = results.rows
      return next();
    })
  })
} 
};

//add user to DB and bcrypt password
const createUser = (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    pool.query('SELECT * from users WHERE username = $1', [username], (err, results) => {
      if(results.rows.length === 0) {
        bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
          if (err) throw err;
          pool.query('INSERT INTO users (username, password) VALUES ($1, $2) returning *', [username, hash], (error, results) => {
            if (error) throw error;
            res.locals.verified = true;
            return next();
          })
        })
      } else {
        res.locals.verified = false;
            return next();
      }


    })
  }

}

// query username and password
const verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  pool.query('SELECT password FROM users where username = $1', [username], (error, results) => {
    if (error) throw error;
    if(results.rows.length === 1) {
      bcrypt.compare(password, results.rows[0].password, (err, isMatch) => {
        if (err) return err;
        if (!isMatch) {
          console.log('password is invalid')
          res.locals.verified = false;
          return next();
        } else {
          res.locals.verified = true;
          return next();
        }
      })
    } else {
      res.locals.verified = false;
      return next();
    }
  })
}



module.exports = {
  getComment,
  verifyUser,
  createUser,
  postComment
}