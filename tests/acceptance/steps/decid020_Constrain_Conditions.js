const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { response } = require("express");
const { createDecTable } = require('./TestUtils');

const data = require('../../../src/adminConfig.json');



chai.use(chaiHttp);
const host = 'localhost:3000';

var decid020Response;
var createdAction; 
var createdCondition;
var createdRule;
var queriedRule;
var act_name = 'Test Action'
var con_name = 'Test Condition'
var con_type = 'boolean'
var con_vals = 'Go,NoGo'
const maxConditionsInTable = data.maxConditionsInTable;
const maxActionsInTable = data.maxActionsInTable;

  
Given('I have created decision table named {string} for testing condition constraint', async function(dec_name) {
    tableId = await createDecTable(dec_name, "table description");
});

Given('I have created the maximum amount of conditions allowed', async function () {

    for(let i = 0; i < maxConditionsInTable; i++) {
        decid020Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: tableId, name: con_name, type: con_type, valueList: con_vals.split(',') });
    }

  });

Given('I have created the maximum amount of action allowed', async function () {

    for(let i = 0; i < maxActionsInTable; i++) {
        decid020Response = await chai
        .request(host)
        .post("/action")
        .send({ tableId: tableId, name: act_name, type: con_type, valueList: con_vals.split(',') });
    }

  });

When('I create another condition', async function () {
    
  decid020ResponseCondition = await chai
  .request(host)
  .post("/condition")
  .send({ tableId: tableId, name: con_name, type: con_type, valueList: con_vals.split(',') });  

    createdCondition = decid020Response.body.action;
    
  });

  When('I create another action', async function () {
    
    decid020ResponseAction = await chai
    .request(host)
    .post("/action")
    .send({ tableId: tableId, name: act_name, type: con_type, valueList: con_vals.split(',') });  
  
      createdCondition = decid020Response.body.action;
      
  });

  Then('I receive an error code as {int} for creating a condition', function (condition_response_code) {
    expect(decid020ResponseCondition.status).to.equal(condition_response_code);
  });

  Then('I receive an error code as {int} for creating a action', function (action_response_code) {
    expect(decid020ResponseAction.body.status).to.equal(action_response_code);
  });

