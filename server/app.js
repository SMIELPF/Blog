var express = require('express');
var apiRouter = require('./router')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(express.static('build'))

app.use('/api',apiRouter);

app.listen(3001)
console.log('server runnning on http://localhost:3001')