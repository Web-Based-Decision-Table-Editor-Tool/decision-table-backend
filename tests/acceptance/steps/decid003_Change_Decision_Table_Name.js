const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid003Response;

/*
 Background: 
 'Before' normally executes before every scenario of every feature file
 Therefore, tags is added so that 'Before' is only executed for the features identified in tags

 Behaviour: 
 The logic resets the filestore, shutsdown the server and restarts the server. 
 */
 let executeOnce = false;
 Before({tags: "@ChangeDecisionTableNameFeature"}, async function () {
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


When('I change the name of Decision Table {string} to {string}', async function(dec_tag, new_dec_name) {
    decid003Response = await chai.request(host).put("/table").send({ id: dec_tag, name: new_dec_name});
});

Then('I receive the new name matching {string}', function(new_dec_name) {
    expect(decid003Response.body.name).to.equal(new_dec_name);
});

Then('I receive an error code as {int} for name change', function (dec_response_code) {
    expect(decid003Response.status).to.equal(dec_response_code);
});



