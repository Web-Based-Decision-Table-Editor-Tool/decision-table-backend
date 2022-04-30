const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { response } = require("express");
const { createDecTable } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';


var decid016Response;
var createdAction; 
var createdCondition;
var createdRule;
var queriedRule;

Given('I have created decision table named {string} for querying rule', async function(dec_name) {
    tableId = await createDecTable(dec_name, "table description");
});

Given('I have a condition in this table named {string} with type {string} and values {string} for querying rule', async function (con_name, con_type, con_vals) {
    decid016Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: tableId, name: con_name, type: con_type, valueList: con_vals.split(',') });
        
    createdCondition = decid016Response.body;
  });

Given('I have an action in this table of type {string} named {string} with action values: {string} for querying rule', async function (action_type, action_name, action_values) {
    
    decid016Response = await chai
        .request(host)
        .post("/action")
        .send({ tableId: tableId, name: action_name, type: action_type, valueList: action_values.split(',') });
        
    createdAction = decid016Response.body.action;
    
  });

Given('I have created a rule in this table with condition {string} and condition value {string}, and action {string} and action value {string} for querying rule', async function (con_name, con_num, action_name, action_num) {
    
    const reqBody = {
        tableId: tableId,
        conditions: [{ id: createdCondition.id, valueid: con_num}],
        actions: [{ id: createdAction.id, valueid: action_num}]
    }
    
    decid016Response = await chai.request(host).post('/rule').send(reqBody);
    createdRule = decid016Response.body
});

When('I query the created rule with its unique id', async function () {
    
    const reqBody = {
        tableId: tableId,
        ruleId: createdRule.id,
    }
    
    decid016Response = await chai.request(host).get('/rule').send(reqBody);
    queriedRule = decid016Response.body.rule;
});

Then('the recieved rule is identical to the previously created rule', function () {
    // Write code here that turns the phrase above into concrete actions
    expect(JSON.stringify(queriedRule)).to.equal(JSON.stringify(createdRule));
  });

Then('I receive an error code as {int} for querying rule', function (response_code) {
    // Write code here that turns the phrase above into concrete actions
    expect(decid016Response.status).to.equal(response_code)
});