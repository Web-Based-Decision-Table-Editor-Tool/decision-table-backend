const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid007Response = null;

/*
 Background: 
 'Before' normally executes before every scenario of every feature file
 Therefore, tags is added so that 'Before' is only executed for the features identified in tags

 Behaviour: 
 The logic resets the filestore, shutsdown the server and restarts the server. 
 */
 let executeOnce = false;
 Before({tags: "@ChangeActionFeature"}, async function () {
     try {
         // Only execute this logic before the first scenario of DeleteDecisionTableFeature
         if(!executeOnce){
             await resetFileStore();
             await shutdown();
             await startServer();
             executeOnce = true;
         }
     } catch (err) {
           console.log(err);
     }
 })

