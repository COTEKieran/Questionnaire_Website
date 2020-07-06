'use strict';

const express = require('express');
const app = express();
const fs = require('fs');



app.use(express.static("public"));
app.use(express.json());

//Ensures the server starts on localhost:8080
app.listen(8080,(err) => {
  
  if (err) console.error('error encountered starting server', err);
  else console.log('server has started on localhost:8080');
});

//Here the user's responses, along with the question names and types, are sent to a new file called responses.json.

app.post('/post-test', (req,res) => {
  console.log('Got body:',req.body);
  res.sendStatus(200);
  fs.writeFile("responses.json", JSON.stringify(req.body,null, '\t'), (err) => {
    if (err) console.log (err);
    console.log("successfully Written to File.");
  });
});

const GoogleAuth = require('simple-google-openid');
 
// Uses the Client ID for Google authenitcation.
app.use(GoogleAuth('313462441845-tg48640feaon7g0pim1smph798l02lch.apps.googleusercontent.com'));
 
// return 'Not authorized' if we don't have a user.
app.use('/api', GoogleAuth.guardMiddleware());
 
app.get('/api/hello', (req, res) => {
  res.send('Hello ' + (req.user.displayName || 'user without a name') + '!');
 //Logs to console when  user successfully authenticates through login.  
  console.log('successfully authenticated request by ' + req.user.emails[0].value);
});

//Error message if server doesn't start.
function error(res,msg){
  res.sendStatus(500);
  console.error(msg);
}