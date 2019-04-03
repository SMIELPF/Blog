/**
 * 连接postgreSql数据库
 */

let pgp = require('pg-promise')(/*options*/);
let db = pgp('postgres://postgres:smielpf1204.@localhost:5432/blog_db2');

class BlogDB {
    /***************************************************
     * 收藏夹相关
     **************************************************/

    /**
     * 获取收藏的某个类别的文章的列表
     * @param {object} param 
     */
    getCollectedArticles({tag,start=1,num}){
        const view = {
            ai:'ai_articles',
            algorithm:'algorithm_articles',
            cpp:'cpp_articles',
            css:'css_articles',
            dataStructure:'datastructure_articles',
            java:'java_articles',
            javaScript:'js_articles',
            linux:'linux_articles',
            mongoDB:'mongodb_articles',
            mySql:'mysql_articles',
            node:'node_articles',
            postgreSql:'postgresql_articles',
            python:'python_articles',
            react:'react_articles',
            vue:'vue_articles',
            webpack:'webpack_articles'
        }
        const sql = `SELECT * FROM ${view[tag]} WHERE row_number >= ${start} `+ (num == undefined?';':`LIMIT ${num};`);
        
        return new Promise((resolve,reject)=>{
            db.any(sql)
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }

    /**
     * 返回收藏的某一类文章的数量
     * @param {string} tag 
     */
    getCollectedArticlesNum(tag){
        const view = {
            ai:'ai_articles',
            algorithm:'algorithm_articles',
            cpp:'cpp_articles',
            css:'css_articles',
            dataStructure:'datastructure_articles',
            java:'java_articles',
            javaScript:'js_articles',
            linux:'linux_articles',
            mongoDB:'mongodb_articles',
            mySql:'mysql_articles',
            node:'node_articles',
            postgreSql:'postgresql_articles',
            python:'python_articles',
            react:'react_articles',
            vue:'vue_articles',
            webpack:'webpack_articles'
        }
        const sql = `SELECT COUNT(*) AS num FROM ${view[tag]};`

        return new Promise((resolve,reject)=>{
            db.one(sql)
            .then(({num})=>{
                resolve(num);
            })
            .catch(error=>{
                reject(error);
            });
        });
    }

    /**
     * 获取收藏的文章的内容
     * @param {number} id 
     */
    getCollectedArticleContent(id){
        let sql = `SELECT * FROM collected_articles WHERE caid=${id};`;

        return new Promise((resolve,reject)=>{
            db.one(sql)
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                reject(error);
            });
        });
    }

    /***************************************************
     * 原创文章相关
     **************************************************/
    /**
     * 获取原创文章列表
     * @param {object} param 
     */
    getOriginalArticles({start=1,num}){
        const sql = `SELECT * FROM original_articles_view WHERE row_number >= ${start} `+ (num == undefined?';':`LIMIT ${num};`);

        return new Promise((resolve,reject)=>{
            db.any(sql)
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }

    /**
     * 添加原创文章
     * @param {object} param 
     */
    insertNewOriginalArticle({title,author,content}){
        const sql = 'INSERT INTO original_articles(title,author,content) VALUES (${title},${author},${content})';

        return new Promise((resolve,reject)=>{
            db.none(sql,{title,author,content})
                .then(()=>{
                    resolve();
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }


    /**
     * 获取原创文章数量
     */
    getOriginalArticlesNum(){
        const sql = 'SELECT COUNT(*) AS num FROM original_articles';

        return new Promise((resolve,reject)=>{
            db.one(sql)
                .then(({num})=>{
                    resolve(num);
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }

    /**
     * 获取原创文章内容
     * @param {string} oaid 
     */
    getOriginalArticleContent(oaid){
        const sql = `SELECT t.*,users.nickname as author_name FROM (SELECT * FROM original_articles) t INNER JOIN users ON t.author = users.uid WHERE oaid=${oaid};`;

        return new Promise((resolve,reject)=>{
            db.one(sql)
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                reject(error);
            });
        });
    }


    /**
     * 获取评论列表
     * @param {object} param
     */
    getComments({oaid,start=1,num}){
        //comments表与users表内连接以获取评论作者的名字
        const sub_sql_0 = `(SELECT comments.*,users.nickname AS comment_author FROM comments INNER JOIN users ON comments.owner = users.uid ) t0`
        //获取所有第oaid号文章下的所有评论
        const sub_sql = `(SELECT ROW_NUMBER() OVER (ORDER BY cid ASC) AS row_number,* FROM ${sub_sql_0} WHERE oaid = ${oaid}) t`;
        //根据start和num提取评论
        const sql = `SELECT * FROM  ${sub_sql}  WHERE row_number >= ${start} `+ (num == undefined?`;`:`LIMIT ${num};`);

        return new Promise((resolve,reject)=>{
            db.any(sql)
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 添加新评论
     * @param {object} param 
     */
    insertNewComment({oaid,owner,content}){
        const sql = 'INSERT INTO comments(oaid,owner,content) VALUES (${oaid},${owner},${content})';

        return new Promise((resolve,reject)=>{
            db.none(sql,{oaid,owner,content})
                .then(()=>{
                    resolve();
                })
                .catch((err)=>{
                    reject(err);
                })
        })
    }

    /**
     * 获取评论数量
     * @param {number} oaid 
     */
    getCommentsNum(oaid){
        const sql = `SELECT COUNT(*) AS num FROM comments WHERE oaid=${oaid}`;

        return new Promise((resolve,reject)=>{
            db.one(sql)
                .then(({num})=>{
                    resolve(num);
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }

    /**
     * 获取回复列表
     * @param {object} param 
     */
    getReplys({cid,start=1,num}){
        //replys表与users表内连接，获取回复者的nickname
        const sub_sql_0 = `(SELECT replys.*,users.nickname AS reply_author FROM replys INNER JOIN users ON replys.owner = users.uid ) t0`
        //获取第cid号评论下的所有回复
        const sub_sql = `(SELECT ROW_NUMBER() OVER (ORDER BY cid DESC) AS row_number,* FROM ${sub_sql_0} WHERE cid = ${cid}) t`;
        //根据start和num提取回复
        let sql = `SELECT * FROM  ${sub_sql}  WHERE row_number >= ${start} `+ (num == undefined?`;`:`LIMIT ${num};`);

        return new Promise((resolve,reject)=>{
            db.any(sql)
                .then(data=>{
                    console.log(data)
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 添加新回复
     * @param {object} param 
     */
    insertNewReply({cid,owner,responder,content}){
        const sql = 'INSERT INTO replys(cid,owner,responder,content) VALUES (${cid},${owner},${responder},${content})';
        return new Promise((resolve,reject)=>{
            db.none(sql,{cid,owner,responder,content})
                .then(()=>{
                    resolve();
                })
                .catch(err=>{
                    reject(err);
                })
        })
    }

    /**
     * 获取回复数量
     * @param {number} cid 
     */
    getReplysNum(cid){
        const sql = `SELECT COUNT(*) AS num FROM replys WHERE cid=${cid}`;

        return new Promise((resolve,reject)=>{
            db.one(sql)
                .then(({num})=>{
                    resolve(num);
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }

    /**
     * 获取文章点赞数
     * @param {number} oaid 
     */
    getLikedNum(oaid){
        const sql = 'SELECT count(*) AS num FROM likes WHERE oaid=${oaid}';
        return new Promise((resolve,reject)=>{
            db.one(sql,{oaid})
                .then(({num})=>{
                    resolve(num);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }
    
    /**
     * 给文章点赞
     * @param {number} oaid
     * @param {number} owner  
     */
    insertLike({oaid,owner}){
        const sql = 'INSERT INTO likes(oaid,owner) VALUES(${oaid},${owner})';
        return new Promise((resolve,reject)=>{
            db.none(sql,{oaid,owner})
                .then(()=>{
                    resolve();
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 给文章取消点赞
     * @param {number} oaid
     * @param {number} owner  
     */
    deleteLike({oaid,owner}){
        const sql = 'DELETE FROM likes WHERE oaid = ${oaid} AND owner = ${owner}';
        return new Promise((resolve,reject)=>{
            db.none(sql,{oaid,owner})
                .then(()=>{
                    resolve();
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /***************************************************
     * 用户相关
     **************************************************/

    /**
     * 根据用户名获取用户信息，用于验证登录
     * @param {string} nickname 
     */
    getUserInfoByNickname(nickname){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT * FROM users WHERE nickname = ${nickname}';
            db.oneOrNone(sql,{nickname})
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }
    
    /**
     * 根据邮箱获取用户信息，用于验证登录
     * @param {string} email 
     */
    getUserInfoByEmail(email){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT * FROM users WHERE email = ${email}';
            db.oneOrNone(sql,{email})
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 根据uid获取用户信息（用户名）
     * @param {number} uid 
     */
    getUserInfoByUid(uid){
        return new Promise((resolve,reject)=>{
            const sql = 'SELECT nickname FROM users WHERE uid = ${uid}';
            db.one(sql,{uid}).
                then(data=>{
                    resolve(data)
                }).catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 添加新用户，用于注册
     * @param {object} param 
     */
    insertNewUser({nickname,email,password}){
        return new Promise((resolve,reject)=>{
            const sql = 'INSERT INTO users(nickname,email,password) VALUES(${nickname},${email},${password})';
            db.none(sql,{nickname,email,password})
                .then(()=>{
                    resolve();
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 获取用户相关的消息(评论、回复)
     * @param {object} param 
     */
    getUserMessages({uid,start=1,num}){
        return new Promise((resolve,reject)=>{
            const sub_sql = `(SELECT ROW_NUMBER() OVER (ORDER BY date_time DESC) AS row_number,* FROM messages WHERE uid = ${uid}) t`;
            const sql = `SELECT * FROM ${sub_sql} WHERE row_number >= ${start} `+ (num == undefined?`;`:`LIMIT ${num};`);
            db.any(sql)
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                    console.log(error)
                    reject(error);
                })
        })
    }

    /**
     * 获取与相关的消息的数目
     * @param {number} uid 
     */
    getUserMessagesNum(uid){
        return new Promise((resolve,reject)=>{
            const sql = 'SELECT COUNT(*) AS num FROM messages WHERE uid=${uid}';
            db.one(sql,{uid})
                .then(({num})=>{
                    resolve(num);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 获取用户的未读消息数
     * @param {number} uid 
     */
    getUserUnreadNum(uid){
        return new Promise((resolve,reject)=>{
            const sql = 'SELECT COUNT(*) AS num FROM messages WHERE uid=${uid} AND unread=TRUE';
            db.one(sql,{uid})
                .then(({num})=>{
                    resolve(num);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 把消息状态修改为已读
     * @param {number} mid 
     */
    updateMessageStatus(mid){
        return new Promise((resolve,reject)=>{
            const sql = 'UPDATE messages SET unread=FALSE WHERE mid=${mid}';
            db.none(sql,{mid})
                .then(()=>{
                    resolve()
                })
                .catch(error=>{
                    reject(error);
                })

        })
    }

    /**
     * 添加新消息
     * @param {number} uid
     * @param {number} oaid
     * @param {string} content 
     * @param {string} title 
     */
    insertNewMessage({uid,oaid,content,title}){
        return new Promise((resolve,reject)=>{
            const sql = 'INSERT INTO messages(uid,oaid,content,title) VALUES (${uid},${oaid},${content},${title})';
            db.none(sql,{uid,oaid,content,title})
                .then(()=>{
                    resolve();
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 查看用户是否点赞过某篇文章
     * @param {number} uid
     * @param {number} oaid 
     */
    getUserDidLikeArticle({uid,oaid}){
        return new Promise((resolve,reject)=>{
            const sql = 'SELECT COUNT(*) AS num FROM likes WHERE oaid = ${oaid} AND owner = ${uid}';
            db.one(sql,{uid,oaid})
                .then(({num})=>{
                    if(Number(num)  === 0){
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                })
                .catch(error=>{
                    reject(error);
                })

        })
    }
}

module.exports = BlogDB;