'use strict';

const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static("public"));
app.use(express.json());
app.use(express.static("frontend"));


//Ensures the server starts on localhost:8080
app.listen(8080,(err) => {
  
  if (err) console.error('error encountered starting server. Error: ', err); //if server doesn't load up
  else console.log('Server has started on localhost:8080');
});

//Here the user's responses, along with the question names and types, are sent to a new file called responses.json.

app.post('/post-test', (req,res) => {
  console.log('Got body:',req.body);
  res.sendStatus(200); //This is how the downloadable file will be presented, with a stringified JSON of the user's responses
  fs.writeFile("recentResponse.json", 'Response and user details: '+ JSON.stringify(req.body,null, '\t'), (err) => {
    if (err) console.log (err);
    console.log("successfully Written to File.");
  });
  
});


 
// Uses the Client ID for Google authenitcation.
const GoogleLogin = require('simple-google-openid');
app.use(GoogleLogin('313462441845-tg48640feaon7g0pim1smph798l02lch.apps.googleusercontent.com'));
 
// return 'Not authorized' if we don't have a user.
app.use('/api', GoogleLogin.guardMiddleware());
 
app.get('/api/hello', (req, res) => {
  res.send('Hello ' + (req.user.displayName || 'user without a name') + '!');
 //Logs to console when  user successfully authenticates through login.  
  console.log(req.user.emails[0].value + " has been authenticated successfully!");
});


//Express Routes
app.get('/completeform', (req,res)=>{
  res.sendFile(__dirname +'/questions.json') 
});

  app.get('/responsedownload', (req,res)=>{
    res.download(__dirname +'/recentResponse.json')
  });

//Error message if server doesn't start.
function error(res,msg){
  res.sendStatus(500);
  console.error(msg);
}