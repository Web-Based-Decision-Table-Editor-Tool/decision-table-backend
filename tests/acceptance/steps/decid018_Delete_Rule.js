const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { response } = require("express");
const { createDecTable } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';


var decid018Response;
var createdAction; 
var createdCondition;
var createdRule;
var queriedRule;

Given('I have created decision table named {string} for deleting rule', async function(dec_name) {
    tableId = await createDecTable(dec_name, "table description");
});

Given('I have a condition in this table named {string} with type {string} and values {string} for deleting rule', async function (con_name, con_type, con_vals) {
    decid018Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: tableId, name: con_name, type: con_type, valueList: con_vals.split(',') });
        
    createdCondition = decid018Response.body;
  });

Given('I have an action in this table of type {string} named {string} with action values: {string} for deleting rule', async function (action_type, action_name, action_values) {
    
    decid018Response = await chai
        .request(host)
        .post("/action")
        .send({ tableId: tableId, name: action_name, type: action_type, valueList: action_values.split(',') });
        
    createdAction = decid018Response.body.action;
    
  });

Given('I have created a rule in this table with condition {string} and condition value {string}, and action {string} and action value {string} for deleting rule', async function (con_name, con_num, action_name, action_num) {
    
    const reqBody = {
        tableId: tableId,
        conditions: [{ id: createdCondition.id, valueid: con_num}],
        actions: [{ id: createdAction.id, valueid: action_num}]
    }
    
    decid018Response = await chai.request(host).post('/rule').send(reqBody);
    createdRule = decid018Response.body
});

When('I delete the created rule', async function () {
    
    const reqBody = {
        tableId: tableId,
        ruleId: createdRule.id,
    }
    
    decid018Response = await chai.request(host).delete('/rule').send(reqBody);
});

Then('I recieve the id of the deleted rule', function () {
    // Write code here that turns the phrase above into concrete actions
    expect(decid018Response.body.id).to.equal(createdRule.id)
});

Then('I receive an error code as {int} for deleting rule', function (response_code) {
    // Write code here that turns the phrase above into concrete actions
    expect(decid018Response.status).to.equal(response_code)
});