const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';


var decid002Response;

//When I query the name of Decision Table <dec_tag>

When('I query the name of Decision Table {string}', async function (dec_tag) {
    // Write code here that turns the phrase above into concrete actions
    decid002Response = await chai
        .request(host)
        .get("/:" + dec_tag);
    });

Then('the returned name should match {string}', function(dec_name) {
    expect(decid002Response.body.name).to.equal(dec_name);
});

Then('I receive an error code as {int}', function (dec_response_code) {
    expect(decid002Response.status).to.equal(dec_response_code);
});