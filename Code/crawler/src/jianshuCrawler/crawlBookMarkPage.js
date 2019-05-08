var request = require('request');
var cheerio = require('cheerio');


const baseUrl = 'https://www.jianshu.com'

function crawlArticleContent(url){
    let promise = new Promise((resolve,reject)=>{
        request(url,(error,res,body)=>{
            if(error){
                reject(error);
            }else{
                var $ = cheerio.load(body.toString(),{decodeEntities: false});//中文字体
                const content = $('.show-content-free').html();
                resolve(content);
            }
        })
    })
    return promise;
}

function crawlJianShu(url){
    return new Promise(resolve=>{
        request(url,(error,res,body)=>{
            if(error){
                console.log(error)
            }else{
                //装载html
                var $ = cheerio.load(body.toString());
                const promiseList = [];
                $('.note-list').children().each((index,li)=>{
                    const promise = new Promise(resolve=>{
                        //抓取基本信息（标题、原文链接、作者）
                        const title = $(li).find('a.title').text();
                        const originalLink = baseUrl + $(li).find('a.title').attr('href');
                        const author = $(li).find('a.nickname').text();

                        //抓取文章内容
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

                    promiseList.push(promise)
                })
                
                Promise.all(promiseList).then(articleItems=>{
                    resolve(articleItems);
                })
            }
        })
    })
}

module.exports = crawlJianShu;
