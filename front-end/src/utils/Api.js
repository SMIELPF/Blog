function get(url){
    return new Promise((resolve,reject)=>{
        fetch(url,{
            method:'GET',
            mode:'cors'
        }).then(res=>{
            return res.json()
        }).then(data=>{
            resolve(data);
        }).catch(error=>{
            reject(error);
        })
    });
}

function post(url,body={}){
    return new Promise((resolve,reject)=>{
        fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        }).then(res=>{
            return res.json()
        }).then(data=>{
            resolve(data);
        }).catch(error=>{
            reject(error)
        })
    })
}


function put(url,body){
    return new Promise((resolve,reject)=>{
        fetch(url,{
            method:'PUT',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        }).then((data)=>{
            resolve(data);
        }).catch(error=>{
            reject(error)
        })
    })
}

function httpDelete(url,body){
    return new Promise((resolve,reject)=>{
        fetch(url,{
            method:'DELETE',
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        }).then((data)=>{
            resolve(data);
        }).catch(error=>{
            reject(error)
        })
    })
}

export default class Api {
    /****************************************
     * 用户相关
     *****************************************/
    //注册
    static postLogInInfo(info){
        const url = '/api/user/login';
        return post(url,info);
    }

    //登录
    static postRegisterInfo(info){
        const url = '/api/user/register';
        return post(url,info);
    }

    //获取用户信息
    static getUserInfo(uid){
        const url = `/api/user/${uid}/info`;
        return get(url);
    }

    //获取用户相关的消息
    static getUserMessages({uid,start,num}){
        const url = `/api/user/${uid}/messages?start=${start}&num=${num}`;
        return get(url);
    }

    //获取用户相关的消息的数量
    static getUserMessagesNum(uid){
        const url = `/api/user/${uid}/messages/num`;
        return get(url);
    }

    //获取用户未读消息数量
    static getUserUnreadNum(uid){
        const url =`/api/user/${uid}/messages/unread/num`;
        return get(url);
    }

    //修改消息已读状态
    static putMessageStatus(mid){
        const url = `/api/user/messages/${mid}`;
        return put(url);
    }

    //添加新消息
    static postNewMessage({uid,oaid,content,title}){
        const url = `/api/user/${uid}/messages`;
        const body = {
            oaid,
            content,
            title
        };
        return post(url,body);
    }

    //查看用户是否给文章点过赞
    static getUserDidLikeArticle({oaid,uid}){
        const url = `/api/user/${uid}/like/${oaid}`;
        return get(url);
    }

    /***************************************
     * 收藏文章相关
     ****************************************/
    //获取文章论列表
    static getCollectedArticles({tag,start,num}){
        const url = `/api/collected_articles/${tag}?start=${start}&num=${num}`;
        return get(url);
    }

    //获取某一类别文章的总数
    static getCollectedArticlesNum(tag){
        const url = `/api/collected_articles/${tag}/num`;
        return get(url);
    }

    //获取文章内容
    static getCollectedArticleContent(caid){
        const url = `/api/collected_articles/a/${caid}`;
        return get(url);
    }
    /***************************************
     * 原创文章相关
     ****************************************/

    //获取文章列表
    static getOriginalArticles({start,num}){
        const url = `/api/original_articles?start=${start}&num=${num}`;
        return get(url);
    }

    //获取文章数量
    static getOriginalArticlesNum(){
        const url = `/api/original_articles/num`;
        return get(url);
    }

    //获取文章内容
    static getOriginalArticleContent(oaid){
        const url = `/api/original_articles/${oaid}`;
        return get(url);
    }

    //获取评论列表
    static getComments({oaid,start,num}){
        const url = `/api/original_articles/${oaid}/comments?start=${start}&num=${num}`;
        return get(url);
    }

    //获取评论数量
    static getCommentsNum(oaid){
        const url = `/api/original_articles/${oaid}/comments/num`;
        return get(url);
    }

    //发布评论
    static postComment(oaid,body){
        const url = `/api/original_articles/${oaid}/comments`;
        return post(url,body);
    }

    //获取回复列表
    static getReplys({cid,start,num}){
        const url = `/api/original_articles/comments/${cid}/replys?start=${start}&num=${num}`;
        return get(url);
    }

    //获取回复数量
    static getReplysNum(cid){
        const url = `/api/original_articles/comments/${cid}/replys/num`;
        return get(url);
    }

    //发布回复
    static postReply(cid,body){
        const url = `/api/original_articles/comments/${cid}/replys`;
        return post(url,body);
    }

    //查看文章点赞数
    static getLike(oaid){
        const url = `/api/original_articles/${oaid}/like`;
        return get(url);
    }

    //给文章点赞
    static postLike({oaid,owner}){
        const url = `/api/original_articles/${oaid}/like`;
        const body = {owner};
        return post(url,body);
    }

    //给文章取消点赞
    static deleteLike({oaid,owner}){
        const url = `/api/original_articles/${oaid}/like`;
        const body = {owner};
        return httpDelete(url,body);
    }
}