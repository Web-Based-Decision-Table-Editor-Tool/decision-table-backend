const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { response } = require("express");

chai.use(chaiHttp);
const host = 'localhost:3000';


var decid016Response;
var createdAction; 
var condition;

Given('I have created a condition of type {string} named {string} to decision table with id {string} with condition values: {string} and {string}', async function (condition_type, condition_name, dec_tag, condition_value1, condition_value2) {
    decid016Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: dec_tag, name: condition_name, type: condition_type, valueList: [condition_value1, condition_value2]});

    condition = decid016Response.body.id;
});

Given('I have added an action of type {string} named {string} to decision table with id {string} with action values: {string} and {string}', async function(action_type, action_name, dec_tag, action_value1, action_value2) {
    
    decid016Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: dec_tag, name: action_name, type: action_type, valueList: [action_value1, action_value2]});

    actionID = decid016Response.body.id;
});

When('I have added a rule associating condition named {string} and its value {string} to action named {string} and its value {string}', async function (tableID) {
    
    decid016Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: dec_tag, name: action_name, type: action_type, valueList: [action_value1, action_value2]});

    
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