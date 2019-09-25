const { pool } = require('../server/config')

const commentsController = {};

// middleware functuon to fetch trails information from REI API
commentsController.getComments = (req, res, next) => {

  const { trailId } = req.body;

  pool.query(`SELECT * FROM comments WHERE id=${trailId}`, (error, results) => {
    if (error) throw error;

    const allComments = [];

    for (obj in results.rows) {
      allComments.push(results.rows[obj]);
    }

    res.locals.comments = allComments;
    return next();
  });
};

module.exports = commentsController;
