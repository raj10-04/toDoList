//jshint esversion:6;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ['eat more'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){ 

    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var day = today.toLocaleDateString('en-us',options);


    res.render('list',{kindOfDay:day, newListItem:items});
});

app.post("/",function(req,res){
    var item = req.body.newItem;
    items.push(item);
    res.redirect('/');
});

app.listen(4000,function(){
    console.log("server is running");
});