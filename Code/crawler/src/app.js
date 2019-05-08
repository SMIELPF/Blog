var JianshuCrawler = require('./jianshuCrawler');
var SegmentFaultCrawler = require('./segmentFaultCrawler');
var Log = require('./Log')

let i = 1;
let JSCrawler = new JianshuCrawler();
let SFCrawler = new SegmentFaultCrawler();

Log.recordCrawlTime()
SFCrawler.start();
JSCrawler.start();

let timer = setInterval(() => {
    if(i === 1){
        clearInterval(timer);
    }else{
        console.log(`第${i}次爬虫`)
        Log.recordCrawlTime()
        SFCrawler.start();
        JSCrawler.start();
        i++;
    }
}, 10000);