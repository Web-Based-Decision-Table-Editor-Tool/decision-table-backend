const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { response } = require("express");
const { createDecTable } = require('./TestUtils');
import data from '../../../src/adminConfig.json'


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid020Response;
var createdAction; 
var createdCondition;
var createdRule;
var queriedRule;
var con_name = 'Test Condition'
var con_type = 'boolean'
var con_vals = 'Go,NoGo'
const maxConditionsInTable = data.maxConditionsInTable;
  
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

When('I create another condition', async function () {
    
  decid020Response = await chai
  .request(host)
  .post("/condition")
  .send({ tableId: tableId, name: con_name, type: con_type, valueList: con_vals.split(',') });  

    createdAction = decid020Response.body.action;
    
  });

Then('I receive an error code as 404 for creating a condition', function (response_code) {
    // Write code here that turns the phrase above into concrete actions
    expect(decid020Response.status).to.equal(404)
});