const fetch = require('node-fetch');

//API request REI API with a latitute and longitude of central LA, with a search radius of 20 miles with 100 max results with a minimum of 3 stars and my user key
let BASE_URL = process.env.HIKING_URL;
const trailController = {};

//middleware functuon to fetch trail information from REI API
trailController.getTrails = (req, res, next) => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(json => {
        console.log("FETCH RETURNS",json)
        res.locals.trails = json
        return next()})
    .catch(err => next({
        err: 'trailController.getTrails: ERROR: Check server logs for details' 
    }));
};

module.exports = trailController;
