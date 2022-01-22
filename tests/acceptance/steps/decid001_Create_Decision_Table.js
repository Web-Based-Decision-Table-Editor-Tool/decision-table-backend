const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then } = require("@cucumber/cucumber");

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid001Response;
 
When('I create decision table named {string} with note {string}', async function (dec_name, dec_note) {
    // Write code here that turns the phrase above into concrete actions
    decid001Response = await chai
        .request(host)
        .post("/table")
        .send({ name: dec_name, note: dec_note});
    });

When('I create decision table with invlaid name {string} with note {string}', async function (dec_name, dec_note) {
    // Write code here that turns the phrase above into concrete actions
    decid001Response = await chai
        .request(host)
        .post("/table")
        .send({ name: dec_name, note: dec_note});
});

Then('I receive identifier stored as tag {string}', function (dec_tag) {
    expect(decid001Response.body.id).to.equal(dec_tag);
});

Then('I receive an error code as {int}', function (errorCode) {
    expect(decid001Response.status).to.equal(errorCode);
});


  