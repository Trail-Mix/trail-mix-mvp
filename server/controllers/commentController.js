const db = require('../database/database.js');

let commentController = {};

// query fetching all comments for specific trails
commentController.getComment = async (req, res, next) => {
    console.log("getComment")
    // const { _id } = req.headers;
    // console.log("req.headers", _id)
    const query = {
        text: 'SELECT * FROM comments WHERE _id = $1',
        values: [_id],
    };
    try {
        const result = await db.query(query);
        res.locals.comments = results.rows;
        return next();
    } catch (err) {
        return next({
            log: `Error in getComment database query: ${err}`,
        });
    }
};

//query posting new comment to DB and then fetching all comments including the one just posted
commentController.postComment = async (req, res, next) => {
    console.log("postComment")
    const { comment, userid } = req.body;
    const query = {
        text: 'INSERT INTO comments ( comment, userid) VALUES ($1, $2) RETURNING *',
        values: [comment, userid],
    };
    try {
        const { rows } = await db.query(query);
        res.locals.comments = rows[0]
    } catch (err) {
        return next({
            log: `Error in postComment db query: ${err}`,
        });
    }
};


module.exports = commentController