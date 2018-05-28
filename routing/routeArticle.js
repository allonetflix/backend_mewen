const express       = require('express');
const router        = express.Router();

const articleController = require('../controllers/articleController');


router.get('/dataArticles', // Article
    articleController.getDataArticles
);

module.exports = router;