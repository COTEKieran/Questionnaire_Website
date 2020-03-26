'use strict';

const express = require('express');
const app = express();
const fs = require('fs');


app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(express.json());

app.listen(8080,(err) => {
  if (err) console.error('error encountered starting server', err);
  else console.log('server has started on localhost:8080');
});



app.post('/post-test', (req,res) => {
  console.log('Got body:',req.body);
  res.sendStatus(200);

  fs.writeFile('pageText.txt', JSON.stringify(req.body), (err) => {
    if (err) conole.log (err);
    console.log("successfully Written to File.");
  });
});


function error(res,msg){
  res.sendStatus(500);
  console.error(msg);
}
