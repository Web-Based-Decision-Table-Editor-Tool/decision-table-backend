const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then } = require("@cucumber/cucumber");

chai.use(chaiHttp);
const host = 'localhost:3000';


var decid013Response;

When('I query the note of Decision Table {string}', async function (dec_tag) {
    decid013Response = await chai
        .request(host)
        .get("/table/note/" + dec_tag);
});

Then('the returned note should match {string}', function(dec_note) {
    expect(decid013Response.body.note).to.equal(dec_note);
});

Then('I receive an error code as {int} for querying a note', function (dec_response_code) {
    expect(decid013Response.status).to.equal(dec_response_code);
});