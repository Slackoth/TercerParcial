var express = require('express');
var router = express.Router();
var soccerControl = require('../controllers/soccerController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createSoccer');
});

router.post('/create', soccerControl.register);

module.exports = router;
