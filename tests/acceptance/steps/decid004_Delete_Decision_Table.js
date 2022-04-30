const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid004Response = null;
var tableId;

Given('I have created decision table named {string} for deletion', async function(dec_name) {
    tableId = await createDecTable(dec_name, "table description");
});

When('I delete the Decision Table by id', async function(){
    decid004Response = await chai.request(host).delete(`/table/${tableId}`);
});

When('I delete a decision table with invlaid tag {string}', async function(dec_tag){
    decid004Response = await chai.request(host).delete(`/table/${dec_tag}`);
});

// Then I receive id of deleted table
Then('I receive id of deleted table', function () {
    expect(decid004Response.id).to.be.not.equal(null);
});

Then('I receive an error code for delete request as {int}', async function(dec_response_code){
    expect(decid004Response).to.have.status(dec_response_code);
});

Then('I receive an error code as {int} and error message as {string}', async function(dec_response_code, dec_msg){
    expect(decid004Response).to.have.status(dec_response_code);
    expect(decid004Response.body.msg).to.equal(dec_msg)
});




