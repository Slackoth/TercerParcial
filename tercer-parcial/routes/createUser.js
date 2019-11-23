var express = require('express');
var router = express.Router();
var userControl = require('../controllers/userController');

/* GET METHOD*/
router.get('/createUser', (req, res, next)=> {
  res.render('createUser');
});
/* POST METHOD */
router.post('/create', userControl.register);


module.exports = router;