const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid005Response = null;

/*
 Background: 
 'Before' normally executes before every scenario of every feature file
 Therefore, tags is added so that 'Before' is only executed for the features identified in tags

 Behaviour: 
 The logic resets the filestore, shutsdown the server and restarts the server. 
 */
 let executeOnce = false;
 Before({tags: "@CreateActionFeature", timeout: 15 * 2000}, async function () {
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

When('I add an action of type boolean named {string} to decision table with id {string} with action values: {string} and {string}', async function(actionName, table_id, value1, value2){
    let reqBody = {
        name: actionName,
        type: "boolean",
        tableId: table_id, 
        valueList: [value1, value2] 
    };
    decid005Response = await chai.request(host).post('/action').send(reqBody);
});


Then('I receive an identifier for the action', function(){
    expect(decid005Response.body).to.have.property("id")
});

Then('I receive a success code {int}', async function(resp_code){
    expect(decid005Response).to.have.status(resp_code);
});

Given('decision table with id {string} does not exist', async function (table_id) {
    // Write code here that turns the phrase above into concrete actions
    //query to confirm table with table id does not exist
});

Then('I receive an action error code as {int}', function (resp_code) {
    // Write code here that turns the phrase above into concrete actions
    expect(decid005Response).to.have.status(resp_code);
});






