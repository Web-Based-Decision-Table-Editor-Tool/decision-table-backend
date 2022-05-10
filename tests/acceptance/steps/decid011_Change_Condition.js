const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid011Response;
var tableId;
var globCon_response

Given('I have created decision table named {string} for updating condition', async function(dec_name) {
    tableId = await createDecTable(dec_name, "table description");
});


Given('I have created a condition named {string} with type {string} and values {string} for this table', async function (con_name, con_type, con_vals) {
    globCon_response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: tableId, name: con_name, type: con_type, valueList: con_vals.split(',') });
});

When('I change the condition {string} with id {string} to condition {string} with type {string} and values {string}', async function (con_name, con_id, new_con_name, new_con_type,new_con_vals) {
    decid011Response = await chai
        .request(host)
        .put("/condition")
        .send({ tableId: tableId, conditionId: globCon_response.body.id, name:new_con_name, type: new_con_type, valueList: new_con_vals.split(',') });
});

Then('I receive the new name matching {string} for condition change', function(new_con_name) {
    expect(decid011Response.body.name).to.equal(new_con_name);
});

Then('I receive an error code as {int} for condition change', function (con_response_code) {
    expect(decid011Response.status).to.equal(con_response_code);
});
