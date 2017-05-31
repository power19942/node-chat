const path = require("path");
const publicPath = path.join(__dirname,'../public');
const express = require("express");
const port = process.env.PORT || 1234;
var app = express();

app.use(express.static(publicPath));
app.listen(port,function () {
   console.log(`app runing on ${port}`);
});