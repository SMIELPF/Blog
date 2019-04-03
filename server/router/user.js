var express = require('express');
var BlogDB = require('../BlogDB');
var wrapSucceedData = require('../utils/wrapSucceedData');
var wrapErrorData = require('../utils/wrapErrorData');

var router = express.Router();
var db = new BlogDB();

function login(req,res){
    const {user,password} = req.body;
    db.getUserInfoByNickname(user).then(data=>{
        if(data === null){
            //如果根据用户名登录查不到用户，则尝试邮箱登录
            return db.getUserInfoByEmail(user)
        }else{
            //如果查找到用户名,则验证密码
            if(data.password === password){
                const resBody = {
                    uid:data.uid,
                    nickname:data.nickname,
                    role:data.role
                }
                res.json(wrapSucceedData(resBody));
            }else{
                res.json(wrapErrorData({message:'密码错误'}))
            }
        }
    }).then(data=>{
        if(data !== undefined){//data不为undefined时,说明上一步没有查到用户
            if(data === null){
                //如果邮箱登录也查不到用户，则返回错误信息
                res.json(wrapErrorData({errorCode:404,message:'用户名或邮箱不存在'}))
            }else{
                //如果查找到用户名,则验证密码
                if(data.password === password){
                    const resBody = {
                        uid:data.uid,
                        nickname:data.nickname,
                        role:data.role
                    }
                    res.json(wrapSucceedData(resBody));
                }else{
                    res.json(wrapErrorData({message:'密码错误'}))
                }
            }
        }
    }).catch(error=>{
        res.status(500).json(wrapErrorData({data:error}))
    })
}

function register(req,res){
    const {nickname,email} = req.body;
    db.getUserInfoByNickname(nickname).then(data=>{
        if(data === null){
            //如果用户名没有重复，检查邮箱是否重复
            return db.getUserInfoByEmail(email)
        }else{
            res.json(wrapErrorData({errorCode:1,message:'该用户名已被注册'}));
        }
    }).then(data=>{
        if(data !== undefined){
            //data不为undefined，说明用户名没有重复
            if(data === null){
                //如果邮箱也没有重复，则可以在数据库中添加新用户
                db.insertNewUser(req.body).then(()=>{
                    res.json(wrapSucceedData(null));
                }).catch(error=>{
                    res.status(500).json(wrapErrorData({data:error}));
                })
            }else{
                res.json(wrapErrorData({errorCode:1,message:'该邮箱已被注册'}))
            }
        }
    })
}

function getUserMessages(req,res){
    const param = {
        ...req.query,
        uid:req.params.uid
    }
    db.getUserMessages(param).then(data=>{
        res.json(wrapSucceedData(data))
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function getUserMessagesNum(req,res){
    db.getUserMessagesNum(req.params.uid).then(data=>{
        res.json(wrapSucceedData(data));
    }).catch(error=>{
        res.status(404).json({data:error});
    })
}

function getUserInfo(req,res){
    db.getUserInfoByUid(req.params.uid).then(data=>{
        res.json(wrapSucceedData(data))
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function getUserDidLikeArticle(req,res){
    const param = {
        uid:req.params.uid,
        oaid:req.params.oaid
    }

    db.getUserDidLikeArticle(param).then(data=>{
        res.json(wrapSucceedData(data))
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function getUserUnreadNum(req,res){
    db.getUserUnreadNum(req.params.uid).then(data=>{
        res.json(wrapSucceedData(data))
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function putMessageStatus(req,res){
    db.updateMessageStatus(req.params.mid).then(()=>{
        res.json(wrapSucceedData(null))
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}

function postNewMessage(req,res){
    const param = {
        uid:req.params.uid,
        ...req.body
    }
    db.insertNewMessage(param).then(()=>{
        res.json(wrapSucceedData(null))
    }).catch(error=>{
        res.status(404).json(wrapErrorData({data:error}));
    })
}


router.post('/login',login);
router.post('/register',register);

router.get('/:uid/info',getUserInfo);

router.route('/:uid/messages')
        .get(getUserMessages)
        .post(postNewMessage);
router.get('/:uid/messages/num',getUserMessagesNum);
router.get('/:uid/messages/unread/num',getUserUnreadNum);
router.put('/messages/:mid',putMessageStatus);

router.get('/:uid/like/:oaid',getUserDidLikeArticle);

module.exports = router;