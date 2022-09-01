//jshint esversion:6;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ['eat more'];
var workItems = ['work'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){ 

    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var day = today.toLocaleDateString('en-us',options);


    res.render('list',{listTitle:day, newListItem:items});
});

app.post("/",function(req,res){
    let item = req.body.newItem;
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