var crawlJianShu = require('./crawlJianShu.js');

const FRONT_END = 'https://www.jianshu.com/c/4dcf98759530';
const SERVER = 'https://segmentfault.com/bookmark/1230000018528532';
const ALGORITHM = 'https://segmentfault.com/bookmark/1230000018528538';
const DATABASE = 'https://segmentfault.com/bookmark/1230000018528539';
const PROBLEM_HANDLE = 'https://segmentfault.com/bookmark/1230000018528552';

crawlJianShu(FRONT_END).then(articles=>{
    console.log(articles.length)
    console.log(articles)
});