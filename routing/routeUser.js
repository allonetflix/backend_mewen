const express       = require('express');
const router        = express.Router();
const passport      = require('passport');

const userController = require('../controllers/userController');
const commonController = require('../controllers/commonController');
const ensureBodyFields = require('../middlewares/ensureBodyFields');


router.post('/register', ensureBodyFields.verifyBody(['pseudo', 'email', 'password', 'lastName']), userController.registerUser);

router.post('/authenticate', ensureBodyFields.verifyBody(['pseudo', 'password']), commonController.authenticationUser);

router.get('/dataUser', passport.authenticate('jwt', { session: false }), (req, res) => { // Profil

    res.json({userData: req.user });
});

module.exports = router;