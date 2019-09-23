const { Pool } = require('pg');
const path = require('path')
const pool = new Pool({
  connectionString: 'postgres://hiiudcpk:Ozq8Ezo4e1c0HZGONL6i2M5_PmHDKUMV@salt.db.elephantsql.com:5432/hiiudcpk'
});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// query fetching all comments
const getComment = (req, res, next) => {
  pool.query('SELECT * FROM comments', (error, results) => {
    if (error) throw error
    res.locals.comment = results.rows
    return next();
  })
};


//add user to DB and bcrypt password
const createUser = async (req, res, next) => {
  const { username, password } = req.body;

  await bcrypt.hash(password, SALT_WORK_FACTOR, function (err, hash) {
    if (err) throw err;
    pool.query('INSERT INTO users (username, password) VALUES ($1, $2) returning *', [username, hash], (error, results) => {
      if (error) throw error;

      res.locals.verified = true;
      return next();
    })
  })
}

// query username and password
const verifyUser = (req, res, next) => {
  const { username, password } = req.body;


  pool.query('SELECT password FROM users where username = $1', [username], (error, results) => {
    if (error) throw error;

    console.log('results.rows:', results.rows[0].password)

    bcrypt.compare(password, results.rows[0].password, (err, isMatch) => {
      if (err) return err;
      console.log('isMatch is:', isMatch)
      if (isMatch) {
        res.locals.verified = true;
        return next();
      }
      res.locals.verified = false;
    });
  })
}



module.exports = {
  getComment,
  verifyUser,
  createUser
}