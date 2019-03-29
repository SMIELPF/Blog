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
     * @param {string} id 
     */
    getOriginalArticleContent(id){
        const sql = `SELECT * FROM original_articles WHERE oaid=${id};`;

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
        //获取所有第oaid号文章下的所有评论
        const sub_sql = `(SELECT ROW_NUMBER() OVER (ORDER BY cid ASC) AS row_number,* FROM comments WHERE oaid = ${oaid}) t`;
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
                    //查找文章作者的id
                    return db.one(`SELECT author FROM original_articles WHERE oaid=${oaid}`);
                })
                .then(({author})=>{
                    //console.log('通知回复的所属帖子的帖主：',author);
                    //通知文章作者有新回复
                    return this._addUnreadNum(author)
                })
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
        //获取第cid号评论下的所有回复
        const sub_sql = `(SELECT ROW_NUMBER() OVER (ORDER BY cid DESC) AS row_number,* FROM replys WHERE cid = ${cid}) t`;
        //根据start和num提取回复
        let sql = `SELECT * FROM  ${sub_sql}  WHERE row_number >= ${start} `+ (num == undefined?`;`:`LIMIT ${num};`);

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
     * 添加新回复
     * @param {object} param 
     */
    insertNewReply({cid,owner,responder,content}){
        const sql = 'INSERT INTO replys(cid,owner,responder,content) VALUES (${cid},${owner},${responder},${content})';

        //要通知的用户的id集合，为了避免重复通知，这里使用了Set而不是array
        let userSet = new Set();
        
        return new Promise((resolve,reject)=>{
            db.none(sql,{cid,owner,responder,content})
                .then(()=>{
                    //将回复的responder加入集合
                    userSet.add(responder);
                    //查找回复所属的评论的作者以及评论所属的文章的id
                    const sub_sql_1 = `SELECT oaid,owner FROM comments WHERE cid=${cid}`;
                    return db.one(sub_sql_1);
                })
                .then(({owner,oaid})=>{
                    //将回复所属的评论的作者加入集合
                    userSet.add(owner);
                    //查找评论所属文章的作者
                    const sub_sql_2 = `SELECT author FROM original_articles WHERE oaid = ${oaid}`;
                    return db.one(sub_sql_2);
                })
                .then(({author})=>{
                    //将评论所属的文章的作者加入集合
                    userSet.add(author);
                    
                    //对userSet中的每个用户，依次调用_addUnreadNum;
                    const promiseList = Array.from(userSet).map((user)=>{
                        return this._addUnreadNum(user);
                    })
                    return Promise.all(promiseList)
                })
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

    /***************************************************
     * 用户相关
     **************************************************/

    /**
     * 给用户的未读消息数加一
     * @param {string} uid 
     */
    _addUnreadNum(uid){
        return new Promise((resolve,reject)=>{
            //获取用户之前的unread_num
            const sql = `SELECT unread_num FROM users WHERE uid = ${uid}`;
            db.one(sql)
                .then(({unread_num})=>{
                    //修改用户的unread_num
                    unread_num ++;
                    const update_sql = 'UPDATE users SET unread_num=${unread_num} WHERE uid=${uid}';
                    return db.none(update_sql,{unread_num,uid});
                }).then(()=>{
                    resolve();
                }).catch((error=>{
                    reject(error);
                }))
        })
    }

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
            //获取与用户相关的回复
            const sql_1 = `SELECT t.content,t.date_time,t.reply_owner AS owner,original_articles.oaid FROM 
                            (SELECT replys.content,replys.date_time,replys.owner AS reply_owner,comments.owner AS comment_owner,comments.oaid,replys.responder
                                FROM comments INNER JOIN replys 
                                ON replys.cid = comments.cid) t 
                            INNER JOIN original_articles on t.oaid = original_articles.oaid
                            WHERE t.responder = ${uid} OR original_articles.author = ${uid} OR t.comment_owner = ${uid}`;
            //获取与用户相关的评论
            const sql_2 = `SELECT comments.content, comments.date_time, comments.owner, original_articles.oaid 
                            FROM (comments INNER JOIN original_articles ON comments.oaid = original_articles.oaid) 
                            WHERE original_articles.author = ${uid}`;

            const unionSql = `((${sql_1}) UNION ALL (${sql_2})) u`;
            let sub_sql = `(SELECT ROW_NUMBER() OVER (ORDER BY date_time DESC) AS row_number,* FROM ${unionSql}) t`;
            let sql =  `SELECT * FROM ${sub_sql}  WHERE row_number >= ${start} `+ (num == undefined?`;`:`LIMIT ${num};`);
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
     * 获取与相关的消息的数目
     * @param {number} uid 
     */
    getUserMessagesNum(uid){
        return new Promise((resolve,reject)=>{
            //获取与用户相关的回复
            const sql_1 = `SELECT t.content,t.date_time,t.reply_owner AS owner,original_articles.oaid FROM 
                            (SELECT replys.content,replys.date_time,replys.owner AS reply_owner,comments.owner AS comment_owner,comments.oaid,replys.responder
                                FROM comments INNER JOIN replys 
                                ON replys.cid = comments.cid) t 
                            INNER JOIN original_articles on t.oaid = original_articles.oaid
                            WHERE t.responder = ${uid} OR original_articles.author = ${uid} OR t.comment_owner = ${uid}`;
            //获取与用户相关的评论
            const sql_2 = `SELECT comments.content, comments.date_time, comments.owner, original_articles.oaid 
                            FROM (comments INNER JOIN original_articles ON comments.oaid = original_articles.oaid) 
                            WHERE original_articles.author = ${uid}`;

            const unionSql = `((${sql_1}) UNION ALL (${sql_2})) u`;
            const sql = `SELECT COUNT(*) AS num FROM ${unionSql}`;
            db.one(sql)
                .then(({num})=>{
                    resolve(num);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    /**
     * 清除用户的未读消息数
     * @param {number} uid 
     */
    clearUserUnreadNum(uid){
        return new Promise((resolve,reject)=>{
            const sql = 'UPDATE users SET unread_num=0 WHERE uid=${uid}';
            db.none(sql,{uid})
                .then(()=>{
                    resolve()
                })
                .catch(error=>{
                    reject(error);
                })

        })
    }
}

module.exports = BlogDB;