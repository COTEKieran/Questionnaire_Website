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
    if (err) console.log (err);
    console.log("successfully Written to File.");
  });
});

const GoogleAuth = require('simple-google-openid');
 
// you can put your client ID here
app.use(GoogleAuth('313462441845-tg48640feaon7g0pim1smph798l02lch.apps.googleusercontent.com'));
 
// return 'Not authorized' if we don't have a user
app.use('/api', GoogleAuth.guardMiddleware());
 
app.get('/api/hello', (req, res) => {
  res.send('Hello ' + (req.user.displayName || 'user without a name') + '!');
 
  console.log('successful authenticated request by ' + req.user.emails[0].value);
});


function error(res,msg){
  res.sendStatus(500);
  console.error(msg);
}
