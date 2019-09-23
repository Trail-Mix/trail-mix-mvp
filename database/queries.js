const { Pool } = require('pg');
const path = require('path')
const pool = new Pool({
  connectionString: 'postgres://hiiudcpk:Ozq8Ezo4e1c0HZGONL6i2M5_PmHDKUMV@salt.db.elephantsql.com:5432/hiiudcpk'
});

// query fetching all comments
const getComment = (req, res, next) => {
  pool.query('SELECT * FROM comments', (error, results) => {
    if (error) throw error
    res.locals.comment = results.rows
    return next();
  })
};


// query username and password
const verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  pool.query('SELECT username, password FROM users',
    //  where username = $1', [username],
    (error, results) => {
      // console.log("results==>", results.rows)
      if (error) {
        res.locals.error = { 'error': error };
        return next(error)
      }
      // console.log(1)
      res.locals.userinfo = results.rows;
      // console.log('userInfo => ', res.locals.userinfo)
      console.log('results.rows in queries.js:', res.locals.userinfo)
      for (let obj of res.locals.userinfo) {
        if (obj.username === username && obj.password === password) {
          res.locals.verified = true;
          return next();
        }
      }
      res.locals.verified = false;
    })
}

const createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log('username is:', username)
  console.log('password is:', password)
  pool.query('INSERT INTO users(username, password) VALUES ($1, $2) returning *', [username, password], (error, results) => {
    if (error) {
      throw error;
    }
    console.log("results from create user => ", results.rows);
    res.locals.createUser = results.rows;
    return next();
  })
}
module.exports = {
  getComment, verifyUser, createUser
}