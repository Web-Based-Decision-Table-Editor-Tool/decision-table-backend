const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid012Response;
var globDec_tag;


// Given('I have created decision table named {string} identified as {string}', async function(dec_name, dec_tag) {
//     globDec_tag = await createDecTable(dec_name, "table description");
//     expect(globDec_tag).to.equal(dec_tag);
// });

// Given('I have created a condition named {string} with type {string} and values {string} for this table', async function (dec_tag, con_name, con_type, con_vals) {
//     let returnedCon = await chai
//         .request(host)
//         .post("/condition")
//         .send({ tableId: dec_tag, name: con_name, type: con_type, valueList: con_vals.split(',') });
// });

When('I delete the condition {string} with id {string}', async function (con_id) {
    decid012Response = await chai
        .request(host)
        .delete("/condition")
        .send({ tableId: globDec_tag, conditionId: con_id});
});

Then('I receive identifier deleted as tag {string}', function(con_name) {
    expect(decid012Response.body.name).to.equal(con_name);
});

Then('I receive an error code as {string} for condition delete', function (con_response_code) {
    expect(decid012Response.status).to.equal(con_response_code);
});