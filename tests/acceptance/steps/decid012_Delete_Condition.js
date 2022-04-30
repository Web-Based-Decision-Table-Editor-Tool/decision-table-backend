const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid012Response;
var globDec_tag;
var globCon_response;

Given('I have created decision table named {string} for delete condition', async function(dec_name) {
    globDec_tag = await createDecTable(dec_name, "table description");
});

Given('I have created a condition named {string} with type {string} and values {string} for this table for condition delete', async function (con_name, con_type, con_vals) {
    globCon_response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: globDec_tag, name: con_name, type: con_type, valueList: con_vals.split(',') });
});

When('I delete the condition {string} with id {string}', async function (con_name,con_id) {
    decid012Response = await chai
        .request(host)
        .delete("/condition")
        .send({ tableId: globDec_tag, conditionId: globCon_response.body.id});
});

Then('I receive identifier deleted as tag {string} for condition delete', function(con_name) {
    expect(decid012Response.body.name).to.equal(con_name);
});

Then('I receive an error code as {int} for condition delete', function (con_response_code) {
    expect(decid012Response.status).to.equal(con_response_code);
});