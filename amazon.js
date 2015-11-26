var amazon = require('amazon-product-api');
var http = require('http');
var express = require('express');
var router = express();
var server = http.createServer(router);



var client = amazon.createClient({
  awsId: "AKIAIIDSBRMGX3J6CM3A",
  awsSecret: "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",
  awsTag: "gettianemcom-20"
});

router.get('/search/:category/:title/:pageamount',function(req, res) {

var category = req.params.category;   
var title = req.params.title;
var pageamount = req.params.pageamount;

client.itemSearch({  
  'SearchIndex': category,
  'Title': title,
  'ItemPage' : pageamount,
  'ResponseGroup': 'ItemAttributes,Images'
}).then(function(results){
  res.send(results)
  //console.log(results);
}).catch(function(err){
  //console.log(err);
 res.send(err);
  
});

});



router.get('/item/:id',function(req, res) {

var id = req.params.id;   


client.itemLookup({  
  'ItemId': id,
  'ResponseGroup': 'ItemAttributes,Images'
}).then(function(results){
  res.send(results)
  //console.log(results);
}).catch(function(err){
  //console.log(err);
 res.send(err);
  
});

});







server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});





