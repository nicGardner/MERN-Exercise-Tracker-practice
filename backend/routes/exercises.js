const router = require('express').Router();

//the '/' route, returns a simple test message
router.route('/').get((req, res) => {
    res.json({
        "message": "test message, please ignore"
    })
})

module.exports = router