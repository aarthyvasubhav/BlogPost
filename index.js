// https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

const express = require('express');
const bodyParser = require('body-parser');
const _ = require("lodash");
const mongoose = require('mongoose');
const home = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const about = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contact = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



const app = express();
app.set('view engine', 'ejs');

mongoose.set("strictQuery",false);

const connectDB = async() => {
  try{
    const conn = await mongoose.connect( "mongodb://127.0.0.1:27017/BlogPost");
    console.log("Mongoose connected");
  }
  catch(e){
    console.log(e);
    process.exit(1);
  }
}
app.use(bodyParser.urlencoded ({extended: true}));
app.use(express.static("public"));

const postSchema = {
  name : {type: String, required: true},
  post: {type: String, required: true}
}

const Posts = mongoose.model('Posts', postSchema);

const homeContent = new Posts({
  name: "Home",
  post: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."

});


let posts = [];

//Posts.create(posts);


app.get("/", async function(req,res){
  if(posts.length === 0){
    Posts.insertMany(posts);
    //post.save();
  }
    const post = await Posts.find({});

  res.render("home", {
    Home: post.name,
    posts: post
  });

});


app.get("/contact", function(req,res){
  res.render("contact", {Contact : contact});
});

app.get("/about", function(req,res){
  res.render("about", {About : about})
});



app.get("/compose", function(req,res){
  res.render("compose");
});


app.post("/", function(req, res) {

 const item = new Posts({
  name : req.body.postTitle,
  post : req.body.newPost
});

item.save();

res.redirect("/");
});



app.get("/posts/:postName", async function(req, res){
  const requestedTitle = req.params.postName;

  await Posts.findOne({name: requestedTitle}).then((items) => {res.render("post", {
        title: items.name,
        content: items.post
      });
    });
});

connectDB().then(() => {
app.listen(3000, function(){
  console.log("Server starts running on port 3000");
});

});
