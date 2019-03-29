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

    //获取用户相关的消息
    static getUserMessages({uid,start,num}){
        const url = `/api/user/${uid}/messages?start=${start}&num=${num}`;
        return get(url);
    }

    //清空用户未读消息数
    static clearUserUnreadNum(uid){
        const url = `/api/user/${uid}/unread_num`;
        return put(url);
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

    static getCollectedArticleContent(oaid){
        const url = `/api/collected_articles/a/${oaid}`;
        return get(url);
    }
    /***************************************
     * 原创文章相关
     ****************************************/

    //获取用户信息
    static getUserInfo(uid){
        const url = `/api/user/${uid}/info`;
        return get(url);
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
}