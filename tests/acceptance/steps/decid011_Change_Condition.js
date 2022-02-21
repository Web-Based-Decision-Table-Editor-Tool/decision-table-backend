const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid011Response;
var globDec_tag;

Given('I have created decision table named {string} identified as {string}', async function(dec_name, dec_tag) {
    globDec_tag = await createDecTable(dec_name, "table description");
    expect(globDec_tag).to.equal(dec_tag);
});

Given('I have created a condition named {string} with type {string} and values {string} for this table', async function (dec_tag, con_name, con_type, con_vals) {
    let returnedCon = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: dec_tag, name: con_name, type: con_type, valueList: con_vals.split(',') });
});

When('I change the condition {string} with id {string} to condition {string} with type {string} and values {string}', async function (con_name, con_id, new_con_name, new_con_type,new_con_vals) {
    decid011Response = await chai
        .request(host)
        .put("/condition")
        .send({ tableId: globDec_tag, conditionId: con_id, name:new_con_name, type: new_con_type, valueList: new_con_vals.split(',') });
});

Then('I receive the new name matching {string}', function(new_con_name) {
    expect(decid011Response.body.name).to.equal(new_con_name);
});

Then('And I receive an error code as {int} for condition change', function (con_response_code) {
    expect(decid011Response.status).to.equal(con_response_code);
});