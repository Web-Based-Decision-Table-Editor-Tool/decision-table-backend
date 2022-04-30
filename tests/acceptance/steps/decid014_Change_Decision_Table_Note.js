const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Given } = require("@cucumber/cucumber");
const { createDecTable } = require("./TestUtils.js")

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid014Response;
var tableId;

Given('I have created decision table named {string} to update note', async function (dec_name) {
    tableId = await createDecTable(dec_name,"");
});

When('I change the note of Decision Table to {string}', async function(new_dec_note) {
    decid014Response = await chai.request(host).put("/table/note").send({ id: tableId, note: new_dec_note});
});

Then('I receive the new note matching {string}', function(new_dec_note) {
    expect(decid014Response.body.note).to.equal(new_dec_note);
});

Then('I receive an error code as {int} for note change', function (dec_response_code) {
    expect(decid014Response.status).to.equal(dec_response_code);
});


