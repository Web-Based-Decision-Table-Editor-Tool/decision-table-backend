const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then } = require("@cucumber/cucumber");

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid003Response;

When('I change the name of decision table with id {string} to the new name of {string}', async function (dec_tag, new_dec_name) {
    
})