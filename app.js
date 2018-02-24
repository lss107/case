var express=require('express');
var ejs=require('ejs');
var expressStatic=require('express-static');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var cookieSeesion=require('cookie-session');
var multer = require('multer');
var multerObj = multer({ dest: './static/uploads/' }); 
var app=express();
app.set('view engine','ejs');
app.set('views','./view');
app.use(bodyParser());
app.use(cookieParser());
app.use(multerObj.any());
var arr = [];
for(var i=0;i<100000;i++){
	arr.push(Math.random()*i + 'a');
}
app.use(cookieSeesion({
	keys:arr,
	maxAge:3600*1000
}));

app.use('/admin',require('./router/admin/index.js')());
app.use('/',require('./router/web/index.js')());
app.use('/data',require('./router/data/index.js')());
app.listen(8000);
app.use(expressStatic('./static'));
// app.use(expressStatic('../wxmall'));