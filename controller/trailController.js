const fetch = require('node-fetch');

let url = 'https://www.hikingproject.com/data/get-trails?lat=34.045023&lon=-118.361273&maxDistance=20&maxResults=100&minStars=3.5&key=200597455-cfbe6650f3776f2f486ae788a2ecf16b'
const trailController = {};

//middleware to get trail information
trailController.getTrails = (req, res, next) => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
        res.locals.trails = json
        // console.log(res.locals.trails)
        return next()})
    .catch(err => next({
        err: 'trailController.getTrails: ERROR: Check server logs for details' 
    }));
};

module.exports = trailController;