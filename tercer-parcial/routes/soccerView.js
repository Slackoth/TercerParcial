var express = require('express');
var router = express.Router();
var soccerControl = require('../controllers/soccerController');

/* GET METHOD. */
router.get('/', function(req, res, next) {
  res.render('viewSoccer');
});

router.get('/fill', soccerControl.getAll);
router.get('/show/:name', soccerControl.getOne);

// /*PUT METHOD*/
router.put('/edit/:name', soccerControl.update)

/* DELETE METHOD */
router.delete('/delete/:name', soccerControl.deleteTeam);

module.exports = router;