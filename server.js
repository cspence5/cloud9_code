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



router.get('/',function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
var instructions = "   Welcome to the Amazon Giving Tree Api" +
                    "\n"   +
                    "\n"   +
                    
                    "  Use the URL as a request to search for items on Amazon\n" +
                     " You can search for items based on title and category(returns many) or item id(returns specific item)\n" +
                     " Example search:\n"  +
                      "\n" +
                     " https://amazon-givingtree-api.herokuapp.com/search/Electronics/32-inch-tv/1\n" +
                      "\n" +
                     " /search/[category]/[keywords]/[number of pages of data to return(up to 10)]\n" +
                      "\n" +
                     " use search to retrieve ASIN #\n" +
                     "\n" +
                      "\n" +
                     " Look up specific item using ASIN #\n" +
                      "\n" +
                     " Example itemlookup\n" +
                      "\n" +
                     " https://amazon-givingtree-api.herokuapp.com/item/B00U9U8RZQ\n" +
                      "\n" +
                     " /item/[ASIN#]"
                     
                       
                     
                     

res.end(instructions);

});




router.get('/search/:category/:title/:pageamount',function(req, res) {

var category = req.params.category;   
var title = req.params.title;
var pageamount = req.params.pageamount;

client.itemSearch({  
  'SearchIndex': category,
  'Keywords': title,
  'ItemPage' : pageamount,
  'ResponseGroup': 'ItemAttributes,Images'
}).then(function(results){
 

  res.send(JSON.stringify(results, null, 4));
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
  res.json(results);
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





