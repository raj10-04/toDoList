//jshint esversion:6;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){ 
       
    var today  = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var day = today.toLocaleDateString('en-us',options);


    res.render('list',{day:day});
});

app.post("/",function(req,res){
    var item = req.body.newItem;
    console.log(item);
});

app.listen(4000,function(){
    console.log("server is running");
});