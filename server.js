var express = require("express");
var app     = express();
var path    = require("path");
var cors = require('cors');
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb', extended: true}))
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.options('*', cors()) // include before other routes

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/js/app.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/app.js'));
});

app.get('/css/style.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/style.css'));
});


app.post('/test', cors(),function(req,res, next){
    
    var json = {}; 
    var xhr = new XMLHttpRequest();
    var url = "http://dev.engin.aftersales.arnoldclark.com/api/Engin";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
   
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
         json = JSON.parse(xhr.responseText);
        res.end(JSON.stringify(json));
      }
      else if (xhr.readyState === 4 && xhr.status === 400) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        res.end(JSON.stringify({"Error":true, "ErrorMessage": xhr.responseText}));
     }
    };
    var data = JSON.stringify(
     req.body
    );
    xhr.send(data); 
  });

app.listen(3000);

console.log("Running at Port 3000");