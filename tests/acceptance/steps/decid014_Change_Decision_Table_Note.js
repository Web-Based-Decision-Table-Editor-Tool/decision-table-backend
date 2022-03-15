const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before } = require("@cucumber/cucumber");


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid014Response;


When('I change the note of Decision Table {string} to {string}', async function(dec_tag, new_dec_note) {
    decid014Response = await chai.request(host).put("/table/note").send({ id: dec_tag, note: new_dec_note});
});

Then('I receive the new note matching {string}', function(new_dec_note) {
    expect(decid014Response.body.note).to.equal(new_dec_note);
});

Then('I receive an error code as {int} for note change', function (dec_response_code) {
    expect(decid014Response.status).to.equal(dec_response_code);
});


