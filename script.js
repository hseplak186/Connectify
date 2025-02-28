const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override"); //we use this package to handle update,delete,put requests using POST method

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))); //to connect and use all static files like style.css, js files,etc in Public folder
app.use(express.urlencoded({extended : true}));  //it used to parse the data from req.body of POST request
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Connectify');
}
main()
.then(() => {
  console.log("Connection Successful") ; 
})
.catch((err) => console.log(err));


let chat1 = new Chat({
    from:"Neha",
    to:"Priya",
    message:"Send me previous year question papers",
    created_at: new Date()
});
chat1.save()
.then((res) => console.log(res));


let port = 8086;
app.listen(port,() => {
    console.log(`server is running on port ${port}`);
});

app.get("/",(req,res) => {
    res.send("root is working");
});

//Index Route
app.get("/chats",async(req,res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});

//New Route
app.get("/chats/new",(req,res) => {
    res.render("new.ejs");
});

//Create Route
app.post("/chats",(req,res) => {
    let {from,to,message} = req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date()
    });
    //console.log(newChat);
    newChat.save().then(res => {console.log("chat was saved")}).catch((err) => {console.log(err)});
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit",async(req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//Update Route
app.put("/chats/:id",async(req,res) => {
    let {id} = req.params;
    let {message:newMessage} = req.body;
    console.log(newMessage);
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {message:newMessage},
        {runValidators:true , new:true} 
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id",async(req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});