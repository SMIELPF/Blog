/**
 * 连接postgreSql数据库
 */
let pgp = require('pg-promise')(/*options*/);
let db = pgp('postgres://postgres:smielpf1204.@localhost:5432/blog_db');

class BlogDB{
    static insertCollectedArticles({
        tag,
        title,
        author,
        originalLink,
        content
    }){
        const sql = `INSERT INTO collected_articles(tag,title,author,original_link,content)
                            VALUES('${tag}','${title}','${author}','${originalLink}','${content}');`
        return new Promise((resolve,reject)=>{
            db.none(sql).then(()=>{
                resolve()
            }).catch(error=>{
                reject(error);
            })
        })
    }
}

module.exports = BlogDB