const db = require('../database/database.js');

let commentController = {};

// query fetching all comments for specific trails
commentController.getComment = async (req, res, next) => {
    console.log("getComment")
    const { _id } = req.headers;
    // res.locals.comments = row[0]
    
    // console.log("HEADER", req.header)
    const query = {
        text: 'SELECT * FROM comments',   // where comment id = trail id
    };
    try {
        const result = await db.query(query);
        // console.log("result", result.fields)
        res.locals.comments = result.rows;
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
    const { comment, trailid } = req.body;
    const query = { 
        text: 'INSERT INTO comments ( comment, trailid) VALUES ($1, $2) RETURNING *',
        values: [comment, trailid],
    }
    try {
        const { rows } = await db.query(query);
        res.locals.comments = rows[0]
        console.log("res.locals", res.locals.comments)
    } catch (err) {
        return next({
            log: `Error in postComment db query: ${err}`,
        });
    }
};


module.exports = commentController