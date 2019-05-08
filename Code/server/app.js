var express = require('express');
var apiRouter = require('./router')
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(express.static('build'))

app.use('/api',apiRouter);

app.listen(3001)
console.log('server runnning on http://localhost:3001')