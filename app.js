//jshint esversion:6;

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const date = require(__dirname+'/date.js');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://raj100shah1:rajshah00@newsdb.5czx041.mongodb.net/todolist');

const itemsSchema = {
    name:String
};

const Item = mongoose.model('Item',itemsSchema);

const item1 = new Item({
    name:"Welcome to your to do list!"
});

const item2 = new Item({
    name:"Hit the + button to add an item"
});

const item3 = new Item({
    name:"<--- Hit this to delete an item"
});

const defaultItems = [item1,item2,item3];

const listSchema = {
    name:String,
    items:[itemsSchema]
};

const List = mongoose.model('List',listSchema);


Item.insertMany(defaultItems,function(err){
    if (err){
        console.log(err)
    }else{
        console.log("success db saved")
    }

})

app.get("/",function(req,res){ 

    Item.find({},function(err,foundItems){
    if(foundItems.length === 0){ 
        Item.insertMany(defaultItems,function(err){
            if(err){
                console.log(err);
            }else{
                console.log("added to db");
            }
        });
        res.redirect('/');
    } else{
     res.render('list',{listTitle:'Today',newListItems:foundItems});
    }
    });
});

app.get('/:customListName',function(req,res){
    const customListName = req.params.customListName;

    List.findOne({name:customListName},function(err,foundList){
        if (!err){
            if(!foundList){
                const list = new List ({
                    name:customListName,
                    items:defaultItems
                });
                list.save();
                res.render('/' + customListName);
            }else{
                res.render('list',{listTitle:foundList.name,newListItems:foundItems})
            }
        }
    });

const list = new List({
    name:customListName,
    items:defaultItems
});

list.save();
});


app.post("/",function(req,res){
    let itemName = req.body.newItem;

    const item=new Item({
        name: itemName
    });
    item.save();
    res.redirect('/');
});

app.post('/delete',function(req,res){
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function(err){
        if(!err){
            console.log('Sucessfully deleted');
        }
    });
})

app.get("/work",function(req,res){
    res.render('list',{listTitle:"Work Lists", newListItem:workItems});
});
// app.post('/work',function(req,res){
//     let workItem = req.body.newItem;
//     workItems.push(item);
//     res.redirect('/work');
// })

app.listen(5100,function(){
    console.log('server running');
})