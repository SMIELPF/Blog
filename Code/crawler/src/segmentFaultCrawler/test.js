var request = require('request');
var fs = require('fs')

function crawlArticleContent(url){
    /*request.get(url,(error,res,body)=>{
        if(error){
            reject(error);
        }else{
            fs.writeFile('./index.html',body.toString(),(error)=>{
                if(!error){
                    console.log('写入完成')
                }
            })
        }
    }).auth('润楠','smielpf1204.');*/
}

crawlArticleContent('https://segmentfault.com/bookmark/1230000018537458');