var express = require('express');
var BlogDB = require('../BlogDB');
var wrapSucceedData = require('../utils/wrapSucceedData');
var wrapErrorData = require('../utils/wrapErrorData');

var router = express.Router();
var db = new BlogDB();

function getOriginalArticles(req,res){
    const param = {
        start:req.query.start,
        num:req.query.num
    }
    db.getOriginalArticles(param).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function postNewOriginalArticle(req,res){
    db.insertNewOriginalArticle(req.body).then(()=>{
        res.json(wrapSucceedData(null));
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function getOriginalArticlesNum(req,res){
    db.getOriginalArticlesNum().then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function getOriginalArticleContent(req,res){
    db.getOriginalArticleContent(req.params.oaid).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function getComments(req,res){
    const param = {
        ...req.query,
        oaid:req.params.oaid
    }
    db.getComments(param).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function postNewComment(req,res){
    const param = {
        ...req.body,
        oaid:req.params.oaid
    }
    db.insertNewComment(param).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(500).json(wrapErrorData({data:error}));
    })
}

function getCommentsNum(req,res){
    db.getCommentsNum(req.params.oaid).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function getReplys(req,res){
    const param = {
        ...req.query,
        cid:req.params.cid
    }
    db.getReplys(param).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function postNewReply(req,res){
    const param = {
        ...req.body,
        cid:req.params.cid
    }
    db.insertNewReply(param).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(500).json(wrapErrorData({data:error}));
    })
}

function getReplysNum(req,res){
    db.getReplysNum(req.params.cid).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

//文章
router.route('/')
        .get(getOriginalArticles)
        .post(postNewOriginalArticle);
router.get('/num',getOriginalArticlesNum);
router.get('/:oaid',getOriginalArticleContent);

//评论
router.route('/:oaid/comments')
        .get(getComments)
        .post(postNewComment);
router.get('/:oaid/comments/num',getCommentsNum);

//回复
router.route('/comments/:cid/replys')
        .get(getReplys)
        .post(postNewReply);
router.get('/comments/:cid/replys/num',getReplysNum);

module.exports = router;