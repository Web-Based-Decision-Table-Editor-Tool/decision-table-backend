const chai = require("chai");
 const expect = require("chai").expect;
 const chaiHttp = require("chai-http");
 const { Given, When, Then, Before } = require("@cucumber/cucumber");
 const { createDecTable } = require('./TestUtils');


 chai.use(chaiHttp);
 const host = 'localhost:3000';

 var decid008Response = null;
 var tableId;

Given("I have created decision table named {string} for delete action", async function(dec_name){
    tableId = await createDecTable(dec_name, "table description");
});

  When('I have created an action named {string} of type boolean', async function(actionName){
    let reqBody = {
        name: actionName,
        type: "boolean",
        tableId, 
        valueList: ["boolVal1", "boolVal2"] 
    };
    decid008Response = await chai.request(host).post('/action').send(reqBody);
});

When('I have created an action named {string} of type text', async function(actionName){
    let reqBody = {
        name: actionName,
        type: "text",
        tableId, 
        valueList: ["This is a test string"]
    };
    decid008Response = await chai.request(host).post('/action').send(reqBody);
});

When('I have created an action named {string} of type numeric', async function(actionName){
    let reqBody = {
        name: actionName,
        type: "numeric",
        tableId, 
        valueList: ["10001"]
    };
    decid008Response = await chai.request(host).post('/action').send(reqBody);
});

 When('I delete the action {string}', async function(actionName){
     let reqBody = {
         id: tableId,
         actionName: actionName
     };
     decid008Response = await chai.request(host).delete('/action').send(reqBody);
 });


 Then('I receive identifier for the deleted action', function(){
     expect(decid008Response.body.id == true);
});

 Then('I receive an error code for action delete request as {int}', async function(delete_action_response_code){
     expect(decid008Response.body.status).to.equal(delete_action_response_code);
 });

