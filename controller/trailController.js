const { pool } = require('../server/config')
const fetch = require('node-fetch');

//API request REI API with a latitute and longitude of central LA, with a search radius of 20 miles with 100 max results with a minimum of 3 stars and my user key
let url = 'https://www.hikingproject.com/data/get-trails?lat=34.383966&lon=-118.537239&maxDistance=20&maxResults=100&minStars=3.5&key=200597455-cfbe6650f3776f2f486ae788a2ecf16b'
const trailController = {};

// middleware functuon to fetch trails information from REI API
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


// middleware functuon to fetch trail information from REI API
trailController.getTrail = (req, res, next) => {

    const { trailId } = req.body;
    console.log(trailId)

    fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailId}&key=200597455-cfbe6650f3776f2f486ae788a2ecf16b`)
    .then(res => res.json())
    .then(json => {
        res.locals.trail = json
        return next()})
    .catch(err => next({
        err: 'trailController.getTrail: ERROR: Check server logs for details'
    }));
};


// middleware functuon to fetch trail information from REI API
trailController.getHikers = (req, res, next) => {

    const { trailId } = req.body;

    pool.query(`SELECT DISTINCT user_id FROM trails WHERE rei_id=${trailId}`, (error, results) => {
      if (error) throw error;
      res.locals.ids = results.rows
      return next();
    });
};

trailController.getHikersInfo = (req, res, next) => {

    if (res.locals.ids.length === 0) {
      res.locals.hikers = [];
      return next();
    }

    const hikersIds = res.locals.ids.map(x => {
        return x.user_id;
    })

    const values = hikersIds.join(", ");

    pool.query(`SELECT _id, username FROM users WHERE _id IN (${values})`, (error, results) => {
      if (error) throw error;
      res.locals.hikers = results.rows;
      return next();
    });
};

// middleware function that saves trail to user
trailController.saveTrail = (req, res, next) => {

    const { userId, reiId, length, location, difficulty, name } = req.body;

    pool.query(`INSERT INTO trails (user_id, rei_id, length, location, difficulty, name) VALUES(${userId}, ${reiId}, ${length}, '${location}', '${difficulty}', '${name}')`, (error, results) => {
      if (error) throw error;
      return next();
    });
};


// middleware function that removes trail from user
trailController.removeTrail = (req, res, next) => {

    const { userId, reiId } = req.body;

    pool.query(`DELETE FROM trails WHERE user_id=${userId} AND rei_id=${reiId}`, (error, results) => {
      if (error) throw error;
      console.log('REMOVED!')
      console.log(results)
      return next();
    });
};

trailController.getUserTrails = (req, res, next) => {
    const { id } = req.body;

    pool.query(`SELECT * FROM trails WHERE user_id=${id}`, (error, results) => {
        if (error) throw error;

        const hikedTrails = results.rows.filter((x) => {
            if (x.hiked === true) {
                return x;
            };
        })

        res.locals.hiked = hikedTrails;
        res.locals.trails = results.rows;
        return next();
      });

};

trailController.updateTrails = (req, res, next) => {

    const {trailId, id} = req.body;

    pool.query(`UPDATE trails SET hiked=true WHERE user_id=${id} AND rei_id=${trailId}`, (error, results) => {
        if (error) throw error;
        return next();
    });
};

module.exports = trailController;
