const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid004Response = null;

Given('I have created decision table named {string} identified as {string}', async function(dec_name, dec_tag) {
    let tableId = await createDecTable(dec_name, "table description");
    expect(tableId).to.equal(dec_tag);
});

When('I delete the Decision Table {string}', async function(dec_tag){
    decid004Response = await chai.request(host).delete(`/table/${dec_tag}`);
});

When('I delete a decision table with invlaid tag {string}', async function(dec_tag){
    decid004Response = await chai.request(host).delete(`/table/${dec_tag}`);
});

Then('I receive identifier deleted as tag {string}', async function(dec_tag){
    expect(decid004Response.body.id).to.equal(dec_tag);
});

Then('I receive an error code for delete request as {int}', async function(dec_response_code){
    expect(decid004Response).to.have.status(dec_response_code);
});

Then('I receive an error code as {int} and error message as {string}', async function(dec_response_code, dec_msg){
    expect(decid004Response).to.have.status(dec_response_code);
    expect(decid004Response.body.msg).to.equal(dec_msg)
});




