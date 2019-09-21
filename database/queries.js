const { Pool } = require('pg');
const path = require('path')
const pool = new Pool({
  connectionString:	'postgres://hiiudcpk:Ozq8Ezo4e1c0HZGONL6i2M5_PmHDKUMV@salt.db.elephantsql.com:5432/hiiudcpk'
});

// query fetching all comments
const getComment = (req, res, next) => {
    pool.query('SELECT * FROM comments', (error, results) => {
      if (error) throw error
      res.locals.comment = results.rows
      return next();
    })
  };

module.exports = {
    getComment
}