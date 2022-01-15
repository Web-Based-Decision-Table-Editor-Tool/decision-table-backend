const chai = require("chai");
const chaiHttp = require("chai-http");
const { Given, When, Then } = require("@cucumber/cucumber");

import app from '../../src/index'

chai.use(chaiHttp);

Given('I have {int} cucumbers in my belly', function (cucumberCount) {
    assert.equal(this.responseStatus, cucumberCount)
  });
  
Given('I am connected to the Decision_Table_Editor_Cloud_Services', async function () {
    response = await chai.request(app).get("/");
    expect(response).to.have.status(201);
});

When('I create decision table named {string} with note {string}', function (name, note) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I receive identifier stored as tag {string}', function (tableId) {
    // Then('I receive identifier stored as tag dt_{float}', function (float) {
      // Write code here that turns the phrase above into concrete actions
      return 'pending';
});

Then('I receive an error code as {int}', function (errorCode) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

