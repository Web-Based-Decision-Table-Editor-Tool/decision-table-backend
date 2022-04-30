const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Given } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';


var decid002Response;
var tableId;

//When I query the name of Decision Table <dec_tag>
Given('I have created decision table named {string}', async function(dec_name) {
    tableId = await createDecTable(dec_name, "table description");
});

When('I query the name of Decision Table', async function() {
    decid002Response = await chai
        .request(host)
        .get("/table/" + tableId);
});

Then('the returned name should match {string}', function(dec_name) {
    expect(decid002Response.body.name).to.equal(dec_name);
});

Then('I receive an error code as {int} for querying a table', function (dec_response_code) {
    expect(decid002Response.status).to.equal(dec_response_code);
});