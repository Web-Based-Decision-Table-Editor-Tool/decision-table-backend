const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { table } = require("console");
const { createDecTable } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';


var decid013Response;
var tableId;

Given('I have created decision table named {string} with note {string}', async function(dec_name, dec_note) {
    tableId = await createDecTable(dec_name, dec_note);
});

When('I query the note of the Decision Table', async function () {
    decid013Response = await chai
        .request(host)
        .get("/table/note/" + tableId);
});

Then('the returned note should match {string}', function(dec_note) {
    expect(decid013Response.body.note).to.equal(dec_note);
});

Then('I receive an error code as {int} for querying a note', function (dec_response_code) {
    expect(decid013Response.status).to.equal(dec_response_code);
});