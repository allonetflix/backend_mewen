const insertQuery   = require('../queries/insert');
const selectQuery   = require('../queries/select');


module.exports.getDataArticles = (req, res) => {

	selectQuery.selectArticles((err, listArticleFound) => {     

        if(err) throw err;
        if(!listArticleFound){ return res.json({success: false, msg: "List Articles not found !"}); }

        res.json({
            succes: true,
            listArticle: listArticleFound
        });
    });
}