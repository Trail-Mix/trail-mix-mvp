const { pool } = require('../server/config')
const fetch = require('node-fetch');

//API request REI API with a latitute and longitude of central LA, with a search radius of 20 miles with 100 max results with a minimum of 3 stars and my user key
let url = 'https://www.hikingproject.com/data/get-trails?lat=34.383966&lon=-118.537239&maxDistance=20&maxResults=100&minStars=3.5&key=200597455-cfbe6650f3776f2f486ae788a2ecf16b'
const trailController = {};

//middleware functuon to fetch trail information from REI API
trailController.getTrails = (req, res, next) => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
        res.locals.trails = json
        return next()})
    .catch(err => next({
        err: 'trailController.getTrails: ERROR: Check server logs for details'
    }));
};


trailController.saveTrail = (req, res, next) => {

    const { userId, reiId, length, location, difficulty, name } = req.body;

    pool.query(`INSERT INTO trails (user_id, rei_id, length, location, difficulty, name) VALUES(${userId}, ${reiId}, ${length}, '${location}', '${difficulty}', '${name}')`, (error, results) => {
      if (error) throw error;
      return next();
    });
};


trailController.removeTrail = (req, res, next) => {

    const { userId, reiId } = req.body;

    pool.query(`DELETE FROM trails WHERE user_id=${userId} AND rei_id=${reiId}`, (error, results) => {
      if (error) throw error;
      return next();
    });
};


module.exports = trailController;
