const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid005Response = null;
var tableId;

Given("I have created decision table named {string} for adding action", async function(dec_name){
    tableId = await createDecTable(dec_name, "table description");
});

When('I add an action of type boolean named {string} to decision table with action values: {string} and {string}', async function(actionName, value1, value2){
    let reqBody = {
        name: actionName,
        type: "boolean",
        tableId: tableId, 
        valueList: [value1, value2] 
    };
    decid005Response = await chai.request(host).post('/action').send(reqBody);
});

When('I add an action of type boolean named {string} to decision table with invalid id with action values: {string} and {string}', async function(actionName, value1, value2){
    let reqBody = {
        name: actionName,
        type: "boolean",
        tableId: "invalid-id", 
        valueList: [value1, value2] 
    };
    decid005Response = await chai.request(host).post('/action').send(reqBody);
});


Then('I receive an identifier for the action', function(){
    expect(decid005Response.body).to.have.property("id")
});

Then('I receive a success code {int} for create action', async function(resp_code){
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
