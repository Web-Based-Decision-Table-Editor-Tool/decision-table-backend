const chai = require("chai");
 const expect = require("chai").expect;
 const chaiHttp = require("chai-http");
 const { Given, When, Then, Before } = require("@cucumber/cucumber");
 const { resetFileStore, shutdown, startServer } = require('./TestUtils');


 chai.use(chaiHttp);
 const host = 'localhost:3000';

 var decid008Response = null;

 /*
  Background: 
  'Before' normally executes before every scenario of every feature file
  Therefore, tags is added so that 'Before' is only executed for the features identified in tags

  Behaviour: 
  The logic resets the filestore, shutsdown the server and restarts the server. 
  */
  let executeOnce = false;
  Before({tags: "@DeleteActionFeature", timeout: 15 * 2000}, async function () {
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

  When('I have created an action in {string} named {string} of type boolean', async function(dec_tag, actionName){
    let reqBody = {
        name: actionName,
        type: "boolean",
        tableId: dec_tag, 
        valueList: ["boolVal1", "boolVal2"] 
    };
    decid008Response = await chai.request(host).post('/action').send(reqBody);
});

When('I have created an action in {string} named {string} of type text', async function(dec_tag ,actionName){
    let reqBody = {
        name: actionName,
        type: "text",
        tableId: dec_tag, 
        valueList: "This is a test string"
    };
    decid008Response = await chai.request(host).post('/action').send(reqBody);
});

When('I have created an action in {string} named {string} of type numeric', async function(dec_tag, actionName){
    let reqBody = {
        name: actionName,
        type: "numeric",
        tableId: dec_tag, 
        valueList: "10001"
    };
    decid008Response = await chai.request(host).post('/action').send(reqBody);
});

 When('I delete the action {string}', async function(actionName){
     let reqBody = {
         id: "dt_1",
         tableName: actionName
     };
     decid008Response = await chai.request(host).delete('/action').send(reqBody);
 });


 Then('I receive identifier for the deleted action', function(){
     expect(decid008Response.body).to.have.property("id")
 });

 Then('I receive an error code for action delete request as {int}', async function(resp_code){
     expect(decid008Response).to.have.status(resp_code);
 });

//  Given('decision table with id {string} does not exist', async function (table_id) {
//      // Write code here that turns the phrase above into concrete actions
//      //query to confirm table with table id does not exist
//  });

//  Then('I receive an action error code as {int}', function (resp_code) {
//      // Write code here that turns the phrase above into concrete actions
//      expect(decid008Response).to.have.status(resp_code);
//  });

