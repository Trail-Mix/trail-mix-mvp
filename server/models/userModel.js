const db = require('../database/database.js');

function User {}

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

User.prototype.createTable = function() {
  const table = `CREATE TABLE IF NOT EXISTS users
                (_id SERIAL PRIMARY KEY,
                 username VARCHAR,
                 password VARCHAR,
                 createdat TIMESTAMP,
                 updatedat TIMESTAMP)`;

  db.query(table);
}

//add user and bcrypt password to database
User.prototype.createUser = function(username, password) {
  this.createTable();

  // const { username, password } = req.body;
  if (username && password) {
    db.query('SELECT * from users WHERE username = $1', [username], (err, results) => {
      if (results.rows.length === 0) {
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


module.exports = User;
