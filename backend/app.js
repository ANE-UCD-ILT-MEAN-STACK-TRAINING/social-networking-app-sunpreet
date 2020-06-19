const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");
const postRoutes = require('./routes/posts');
const path = require("path");

mongoose
  .connect(
    "mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


  // Lets attach the body-parser middleware
// bodyParser.json() -> this will tell only to process json type data from the request body
app.use(bodyParser.json());
//another example showing body-parser can process other types of body other than json
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use('/api/posts', postRoutes);

module.exports = app;


