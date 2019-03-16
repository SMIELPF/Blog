var request = require('request');
var cheerio = require('cheerio');

const baseUrl = 'https://segmentfault.com';

function crawlArticleContent(url){
    let promise = new Promise((resolve,reject)=>{
        request(url,(error,res,body)=>{
            if(error){
                reject(error);
            }else{
                var $ = cheerio.load(body.toString(),{decodeEntities: false});//中文字体
                const content = $('.article__content').html();
                resolve(content);
            }
        })
    })
    return promise;
}

function crawlSegmentFault(url){
    return new Promise(resolve=>{
        request(url,(error,res,body)=>{
            if(error){
                console.log(error)
            }else{
                var $ = cheerio.load(body.toString());
                const promiseList = [];
                $('.summary').each(function(index,div){
                    const promise = new Promise((resolve)=>{
    
                        //爬取标题、原文链接、作者等基本信息
                        const title = $(div).find('h2').text();
                        const originalLink= baseUrl + $(div).find('h2').children('a').attr('href');
                        let authorArray = [];
                        $(div).children('ul.author').children().each(function(index,li){
                            authorArray.push($(li).find('a').text())
                        })
                        const author = authorArray.join('、');
        
                        //爬取文章具体内容
                        crawlArticleContent(originalLink).then(content=>{
                            const articleItem = {
                                title,
                                originalLink,
                                author,
                                content
                            }
                            resolve(articleItem);
                        })
                    })
    
                    //将promise放入promise数组中
                    promiseList.push(promise);
                })
    
                Promise.all(promiseList).then(articleItems=>{
                    resolve(articleItems)
                })
            }
        })
    })
}

module.exports = crawlSegmentFault;