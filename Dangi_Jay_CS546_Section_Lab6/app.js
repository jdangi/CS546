const express = require('express');

var app = express();
var router = require('./router');

app.use(router);

app.listen(3000, ()=>{
    console.log('server listening at port 3000');
});