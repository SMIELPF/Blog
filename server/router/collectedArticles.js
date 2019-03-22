var express = require('express');
var BlogDB = require('../BlogDB');
var wrapSucceedData = require('../utils/wrapSucceedData');
var wrapErrorData = require('../utils/wrapErrorData');

var router = express.Router();
var db = new BlogDB();

function getCollectedArticles(req,res){
    const param = {
        ...req.query,
        tag:req.params.tag
    };
    db.getCollectedArticles(param).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.json(wrapErrorData({data:error}));
    })
}

function getCollectedArticlesNum(req,res){
    db.getCollectedArticlesNum(req.params.tag).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.json(wrapErrorData({data:error}));
    })
}

function getCollectedArticleContent(req,res){
    db.getCollectedArticleContent(req.params.oaid).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.json(wrapErrorData({data:error}));
    })
}

router.get('/:tag',getCollectedArticles);
router.get('/:tag/num',getCollectedArticlesNum);
router.get('/a/:oaid',getCollectedArticleContent);

module.exports = router;