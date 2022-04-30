const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid009Response;
var tableId;

Given("I have created decision table named {string} for creating condition", async function(dec_name){
    tableId = await createDecTable(dec_name, "table description");
});

When('I create a condition in table named {string} with type {string} and values {string}', async function (con_name, con_type, con_vals) {
    decid009Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: tableId, name: con_name, type: con_type, valueList: con_vals.split(',') });
});

When('I create a condition in table with invalid id named {string} with type {string} and values {string}', async function (con_name, con_type, con_vals) {
    decid009Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: "Invalid", name: con_name, type: con_type, valueList: con_vals.split(',') });
});
Then('a condition with a non-null id is created', function () {
    expect(decid009Response.body.id).to.not.equal(null);
    expect(decid009Response.body.id).to.not.equal(undefined);
});

Then('the condition named {string} with type {string} and values {string} is created', function (con_name, con_type, con_vals) {
    expect(decid009Response.body.name).to.equal(con_name);
    expect(decid009Response.body.type).to.equal(con_type);
    values = con_vals.split(',');
    expect(decid009Response.body.valueList).to.not.equal(null);
    valueList = decid009Response.body.valueList;
    for(let i = 0; i < valueList.length; i++){
        val = valueList[i].value;
        expect(val).to.equal(values[i]);
    }
});


Then('I receive an error code as {int} for condition creation', function (errorCode) {
    expect(decid009Response.status).to.equal(errorCode);
});

Then('I receive an error message as {string} for condition creation', function (err_msg) {
    expect(decid009Response.text).to.equal(err_msg)
});
  