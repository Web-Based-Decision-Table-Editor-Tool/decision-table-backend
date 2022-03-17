const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before, Given } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer, createDecTable } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid003Response;
var tableId;

/*
 Background: 
 'Before' normally executes before every scenario of every feature file
 Therefore, tags is added so that 'Before' is only executed for the features identified in tags

 Behaviour: 
 The logic resets the filestore, shutsdown the server and restarts the server. 
 */
 let executeOnce = false;
 Before({tags: "@ChangeDecisionTableNameFeature", timeout:15*2000}, async function () {
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

Given("I have created decision table named {string} for updating", async function(dec_name){
    tableId = await createDecTable(dec_name, "table description");
});

When('I change the name of Decision Table to {string}', async function(new_dec_name) {
    decid003Response = await chai.request(host).put("/table").send({ id: tableId, name: new_dec_name});
});

Then('I receive the new name matching {string}', function(new_dec_name) {
    expect(decid003Response.body.name).to.equal(new_dec_name);
});

Then('I receive an error code as {int} for name change', function (dec_response_code) {
    expect(decid003Response.status).to.equal(dec_response_code);
});



