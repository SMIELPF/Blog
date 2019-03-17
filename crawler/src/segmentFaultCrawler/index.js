var crawlSegmenFault = require('./crawlSegmentFault.js');
var BlogDB = require('../dbHandler/BlogDB');
var db = new BlogDB();

class SegmentFaultCrawler{
    constructor(){
        this.crawlerTarget = [
            {
                tag:'JS',
                url:''
            },
            {
                tag:'NODE',
                url:''
            },
            {
                tag:'REACT',
                url:''
            },
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
            }
        ]
    }

    startCrawl(){
        for(target of this.crawlerTarget){
            crawlSegmenFault(target.url).then(articles=>{
                for(article of articles){
                    Object.assign(article,{tag:target.tag});
                }
            })
        }
    }
}