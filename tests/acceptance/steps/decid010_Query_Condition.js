const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { response } = require("express");
const { createDecTable } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';


var decid010Response;
var conditionId; 
var tableId;

Given("I have created decision table named {string} for query condition", async function(dec_name){
    tableId = await createDecTable(dec_name, "table description");
});

Given('I have created a condition of type boolean named {string} to decision table with condition values: {string} and {string}', async function(conditionName, value1, value2){
    let reqBody = {
        name: conditionName,
        type: "boolean",
        tableId, 
        valueList: [value1, value2] 
    };
    let resp = await chai.request(host).post('/condition').send(reqBody);
    conditionId = resp.body.id;
});

When('I query the condition in decision table', async function () {
    let reqBody = {
        tableId,
        conditionId: conditionId
    }
    // Write code here that turns the phrase above into concrete actions
    decid010Response = await chai
        .request(host)
        .get("/condition").send(reqBody);
    
});

Then('the returned condition should have type boolean and name {string}', function (name) {
    // Write code here that turns the phrase above into concrete actions
    expect(decid010Response.body.name).to.equal(name);
  });

Then('I receive an error code as {int} for querying a condition', function (code) {
    // Write code here that turns the phrase above into concrete actions
    expect(decid010Response).to.have.status(code);
  });
