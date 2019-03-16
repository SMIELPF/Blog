var crawlSegmenFault = require('./crawlSegmentFault.js');

const FRONT_END = 'https://segmentfault.com/bookmark/1230000004834226';
const SERVER = 'https://segmentfault.com/bookmark/1230000018528532';
const ALGORITHM = 'https://segmentfault.com/bookmark/1230000018528538';
const DATABASE = 'https://segmentfault.com/bookmark/1230000018528539';
const PROBLEM_HANDLE = 'https://segmentfault.com/bookmark/1230000018528552';

crawlSegmenFault(FRONT_END).then(articles=>{
    console.log(articles.length)
});