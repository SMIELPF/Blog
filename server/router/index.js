var express = require('express');
var collectedArticlesRouter = require('./collectedArticles');
var originalArticlesRouter = require('./originalArticles');
var userRouter = require('./user');

var router = express.Router();

//跨域设置
router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

router.use('/collected_articles',collectedArticlesRouter);
router.use('/original_articles',originalArticlesRouter);
router.use('/user',userRouter);

module.exports = router;