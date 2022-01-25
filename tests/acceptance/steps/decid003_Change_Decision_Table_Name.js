const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Given } = require("@cucumber/cucumber");

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid003Response;

When('I change the name of Decision Table {string} to {string}', async function(dec_tag, new_dec_name) {
    decid003Response = await chai.request(host).put("/table").send({ id: dec_tag, name: new_dec_name});
});

Then('I receive the new name matching {string}', function(new_dec_name) {
    expect(decid003Response.body.name).to.equal(new_dec_name);
});

Then('I receive an error code as {int} for name change', function (dec_response_code) {
    expect(decid003Response.status).to.equal(dec_response_code);
});



