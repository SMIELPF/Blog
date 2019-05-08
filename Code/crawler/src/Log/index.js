var fs = require('fs');
const PATH = '../../crawler.log'

function getLocalTime(timestamp) {
    var d = new Date(timestamp);
    var date = (d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            (d.getHours() > 9?`0${d.getHours()}`:d.getHours()) + ":" +
            (d.getMinutes() > 9?`0${d.getMinutes()}`:d.getMinutes()) + ":" +
            (d.getSeconds() > 9?`0${d.getSeconds()}`:d.getSeconds());
    return date;
}

class Log {
    static _record(data){
        fs.writeFile(PATH,data,{flag:'a'},(error)=>{
            if(error){
                console.log(error);
            }
        })
    }

    static recordCrawlTime(){
        const info = `\n\n${getLocalTime(Date())}爬虫日志\n--------------------------------------------------\n`;
        this._record(info);
    }

    static recordNewArticles(articles){
        for(let article of articles){
            this._record(`  - ${article.tag}收藏夹下添加新文章《${article.title}》\n`);
        }
    }

    static recordNoNewArticle(tag){
        this._record(`  -${tag}收藏夹下没有新文章\n\n`)
    }

    static recordDBError(error){
        this._record(`数据库操作发生错误，错误信息：\n${JSON.stringify(error)}\n`);
    }

}

module.exports = Log;  