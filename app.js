//jshint esversion:6;

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+'/date.js');
const app = express();


var items = ['eat more'];
var workItems = ['work'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){ 

    let day = date();

    res.render('list',{listTitle:day, newListItem:items});
});

app.post("/",function(req,res){
    let item = req.body.newItem;
    console.log(req.body.list);
    if (req.body.list==="Work"){
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }
 });

app.get("/work",function(req,res){
    res.render('list',{listTitle:"Work Lists", newListItem:workItems});
});
// app.post('/work',function(req,res){
//     let workItem = req.body.newItem;
//     workItems.push(item);
//     res.redirect('/work');
// })

app.listen(4000,function(){
    console.log("server is running");
});