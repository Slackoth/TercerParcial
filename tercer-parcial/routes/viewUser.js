var express = require('express');
var router = express.Router();
var userControl = require('../controllers/userController');

/* GET METHOD. */
router.get('/', function(req, res, next) {
  res.render('viewUser');
});
router.get('/fill', userControl.getAll);
router.get('/show/:username', userControl.getOne);

/*PUT METHOD*/
router.put('/edit/:username', userControl.update)

/* DELETE METHOD */
router.delete('/delete/:username', userControl.deleteUser);

module.exports = router;
