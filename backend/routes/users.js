const router = require('express').Router();
let User = require('../models/user');

/**
 * default route
 * makes a GET request to get all users in the db
 */
router.route('/').get((req, res) => {
    User.find()//returns a promise
        .then(users => res.json(users)) //return all users in json format
        .catch(err => res.status(400).json('Error: ' + err)); //if there is an error: catch it and display it
});

/**
 * add route
 * pakes a POST request to save a new user in the database with the entered username
 */
router.route('/add').post((req, res) => {
    const username = req.body.username;//get the username from the body.username valueon the page

    const newUser = new User({username});//declare a new User (user.model.js), passing it username as an argument

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;