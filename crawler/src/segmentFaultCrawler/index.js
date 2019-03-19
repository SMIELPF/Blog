var crawlBookMarkPage = require('./crawlBookMarkPage');
var Crawler = require('../Crawler');

class SegmentFaultCrawler extends Crawler{
    constructor(){
        super();
        this.crawlerTargets = [
            {
                tag:'JS',
                url:'https://segmentfault.com/bookmark/1230000018197926'
            },
            {
                tag:'NODE',
                url:'https://segmentfault.com/bookmark/1230000014599301'
            },
            {
                tag:'REACT',
                url:'https://segmentfault.com/bookmark/1230000014428210'
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

module.exports = SegmentFaultCrawler;