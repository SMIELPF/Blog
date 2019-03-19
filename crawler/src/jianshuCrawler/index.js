var crawlBookMarkPage = require('./crawlBookMarkPage');
var Crawler = require('../Crawler');

class JianshuCrawler extends Crawler{
    constructor(){
        super();
        this.crawlerTargets = [
            {
                tag:'JS',
                url:'https://www.jianshu.com/c/b1f82bbe226e'
            },
            {
                tag:'NODE',
                url:'https://www.jianshu.com/c/a436e05fdbab'
            },
            {
                tag:'REACT',
                url:'https://www.jianshu.com/c/4dcf98759530'
            }/*,
            {
                tag:'VUE',
                url:''
            },
            {
                tag:'WEBPACK',
                url:''
            },
            {
                tag:'CSS',
                url:''
            },
            {
                tag:'JAVA',
                url:''
            },
            {
                tag:'CPP',
                url:''
            },
            {
                tag:'PYTHON',
                url:''
            },
            {
                tag:'LINUX',
                url:''
            },
            {
                tag:'MYSQL',
                url:''
            },
            {
                tag:'POSTGRESQL',
                url:''
            },
            {
                tag:'REDIS',
                url:''
            },
            {
                tag:'MONGODB',
                url:''
            },
            {
                tag:'ALGORITHM',
                url:''
            },
            {
                tag:'DATASTRUCTURE',
                url:''
            },
            {
                tag:'AI',
                url:''
            }*/
        ];
    }

    crawl(url){
        return crawlBookMarkPage(url);
    }
}

module.exports = JianshuCrawler;