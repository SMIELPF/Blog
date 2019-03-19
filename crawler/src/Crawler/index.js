var db = require('../BlogDB')
var Log = require('../Log')

class Crawler{
    constructor(){
        //爬虫次数
        this.crawledNumber = -1;
    }

    /**
     * 爬取某个收藏夹下的文章
     * @param { Object }target 
     */
    crawlBookMark(target){
        return new Promise(resolve=>{
            this.crawl(target.url).then(articles=>{; 
                //给每篇文章添加tag属性
                for(let article of articles){
                    Object.assign(article,{tag:target.tag});
                }
                resolve(articles);
            })
        })
    }

    /**
     * 返回收藏夹中新增的文章
     * @param {Object} target
     * @param {array} crawledArticles 
     */
    getNewArticles(target,crawledArticles){
        if(this.crawledNumber === 0){//如果是第一轮爬虫，直接返回爬取到的所有文章
            //记录本轮爬虫的第一篇文章到target的lastTitle属性中，供下一轮爬虫作比对
            target.lastTitle = crawledArticles[0].title;
            //记录日志信息
            Log.recordNewArticles(crawledArticles);
            return crawledArticles
        }else{//如果不是第一轮爬虫，将爬取到的文章与上一轮爬虫的最新文章对比，只返回本轮爬虫的新文章
            let newArticles = [];  
            for(let article of crawledArticles){
                if(article.title === target.lastTitle){
                    break;
                }else{
                    newArticles.push(article);
                }
            }
            //记录本轮爬虫的第一篇文章到target的lastTitle属性中，供下一轮爬虫作比对
            target.lastTitle = crawledArticles[0].title

            //在日志中记录信息
            if(newArticles.length === 0){
                Log.recordNoNewArticle(target.tag);
            }else{
                Log.recordNewArticles(newArticles);
            }
            return newArticles;
        }
    }

    /**
     * 将收藏夹中新增的文章插入到数据库中
     * @param {array} newArticles
     */
    insertArticleIntoDB(newArticles){
        for(let article of newArticles){
            db.insertNewArticle(article).then(()=>{
                console.log(`<${article.title}>写入数据库`)
            }).catch(error=>{
                console.log(`<${article.title}>发生错误，写入日志`,error)
                Log.recordDBError(error);
            })
        }
    }


    /**
     * 启动爬虫
     * @param {function} callback 
     */
    start(){
        for(let target of this.crawlerTargets){
            this.crawlBookMark(target).then(articles=>{
                const newArticles = this.getNewArticles(target,articles);
                this.insertArticleIntoDB(newArticles);
            })
        }
        this.crawledNumber ++;
        console.log(this.crawlerTargets);
    }
}

module.exports = Crawler;