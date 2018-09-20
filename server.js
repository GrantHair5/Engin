var express = require("express");
var app     = express();
var path    = require("path");
var cors = require('cors');
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb', extended: true}))

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
    
    var response = {
        "make": "KIA",
        "model": "SPORTAGE 2 CRDI ISG",
        "regNumber": "LB65CVC",
        "colour": "SILVER",
        "chassisNumber": "U5YPH815LGL001205",
        "capCode": "KISP172  5EDTM  4",
        "engineSize": "1685",
        "spec": null
    }


   
  
  
    // Default options are marked with *
    var responseJson =  fetch(`http://dev.engin.aftersales.arnoldclark.com/api/Engin`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(req.body), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
  


    console.log("hello");
    console.log(JSON.stringify(responseJson));
    res.end(JSON.stringify(response));

 
  });


app.listen(3000);

console.log("Running at Port 3000");