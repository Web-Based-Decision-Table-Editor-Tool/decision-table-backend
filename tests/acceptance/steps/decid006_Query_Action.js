const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { response } = require("express");

chai.use(chaiHttp);
const host = 'localhost:3000';


var decid006Response;
var actionID; 

Given('I have created an action of type boolean named {string} to decision table with id {string} with action values: {string} and {string}', async function(actionName, table_id, value1, value2){
    let reqBody = {
        name: actionName,
        type: "boolean",
        tableId: table_id, 
        valueList: [value1, value2] 
    };
    let resp = await chai.request(host).post('/action').send(reqBody);
    actionID = resp.body.id;
});

When('I query the action in decision table with id {string}', async function (tableID) {
    let reqBody = {
        tableId : tableID,
        actionId: actionID
    }
    // Write code here that turns the phrase above into concrete actions
    decid006Response = await chai
        .request(host)
        .get("/action/" + actionID).send(reqBody);
    
});

Then('the returned action should have type boolean and name {string}', function (name) {
    // Write code here that turns the phrase above into concrete actions
    expect(decid006Response.body.name).to.equal(name);
  });

Then('I receive an error code as {int} for querying an action', function (code) {
    // Write code here that turns the phrase above into concrete actions
    expect(decid006Response).to.have.status(code);
  });