const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid009Response;

/*
 Background: 
 'Before' normally executes before every scenario of every feature file
 Therefore, tags is added so that 'Before' is only executed for the features identified in tags

 Behaviour: 
 The logic resets the filestore, shutsdown the server and restarts the server. 
 */
 let executeOnce = false;
Before({tags: "@CreateConditionFeature"}, async function () {
    try {
        // Only execute this logic before the first scenario
        if(!executeOnce){
            await resetFileStore();
            await shutdown();
            await startServer();
            executeOnce = true;
        }
    } catch (err) {
        console.log(err);
    }
})

When('I create a condition in table identified as {string} named {string} with type {string} and values {string}', async function (dec_tag, con_name, con_type, con_vals) {
    decid009Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: dec_tag, name: con_name, type: con_type, valueList: con_vals.split(',') });
});

Then('a condition with a non-null id is created', function () {
    expect(decid009Response.body.id).to.not.equal(null);
    expect(decid009Response.body.id).to.not.equal(undefined);
});

Then('the condition named {string} with type {string} and values {string} is created', function (con_name, con_type, con_vals) {
    expect(decid009Response.body.name).to.equal(con_name);
    expect(decid009Response.body.type).to.equal(con_type);
    expect(decid009Response.body.valueList).to.eql(con_vals.split(','));
});


Then('I receive an error code as {int} for condition creation', function (errorCode) {
    expect(decid009Response.status).to.equal(errorCode);
});

Then('I receive an error message as {string} for condition creation', function (err_msg) {
    expect(decid009Response.text).to.equal(err_msg)
});
  