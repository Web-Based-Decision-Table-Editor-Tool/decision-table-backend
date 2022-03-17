const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid015Response;
var condition;
var action;
var rule;

/*
 Background: 
 'Before' normally executes before every scenario of every feature file
 Therefore, tags is added so that 'Before' is only executed for the features identified in tags

 Behaviour: 
 The logic resets the filestore, shutsdown the server and restarts the server. 
 */
 let executeOnce = false;
Before({tags: "@CreateRuleFeature"}, async function () {
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

Given('I have a condition in table identified as {string} named {string} with type {string} and values {string}', async function (dec_tag, con_name, con_type, con_vals) {
    decid015Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: dec_tag, name: con_name, type: con_type, valueList: con_vals.split(',') });
        
    expect(decid015Response.body.id).to.not.equal(null);
    expect(decid015Response.body.id).to.not.equal(undefined);
    condition = decid015Response.body;
  });

Given('I have an action in table {string} of type {string} named {string} with action values: {string}', async function (dec_tag, action_type, action_name, action_values) {
    vals = action_values.split(",");
    let reqBody = {
        name: action_name,
        type: action_type,
        tableId: dec_tag, 
        valueList: vals
    };
    decid015Response = await chai.request(host).post('/action').send(reqBody);
    expect(decid015Response.body).to.have.property("id")
    actionID = decid015Response.body.id
    reqBody = {
        tableId : dec_tag,
        actionId: actionID
    }
    // Write code here that turns the phrase above into concrete actions
    decid015Response = await chai
        .request(host)
        .get("/action/" + actionID).send(reqBody);
    
    expect(decid015Response.body.name).to.equal(action_name)

    action = decid015Response.body;
  });

When('I create a rule in table {string} with condition {string} and condition value {string}, and action {string} and action value {string}', async function (dec_tag, con_name, con_num, action_name, action_num) {
    const reqBody = {
        tableId: dec_tag,
        conditions: [{ id: condition.id, valueid: con_num}],
        actions: [{ id: action.id, valueid: action_num}]
    }
    decid015Response = await chai.request(host).post('/rule').send(reqBody);
    rule = decid015Response.body
});

Then('I receive a unique rule identifier', function () {
    expect(rule).to.haveOwnProperty("id");
  });

Then('created rule has specified condition with value {string} and action with value {string}', function (con_num, action_num) {
    console.log("rule: ", rule)
    expect(rule.conditions[0].itemid).to.equal(condition.id)
    expect(rule.conditions[0].valueid).to.equal(con_num)
    expect(rule.actions[0].itemid).to.equal(action.id)
    expect(rule.actions[0].valueid).to.equal(action_num)
  });

Then('I receive an error code as {int} for rule creation', function (code) {
    expect(decid015Response).to.have.status(code);
});

When('I create a rule in table {string} with condition that does not exist', async function (dec_tag) {
    const reqBody = {
        tableId: dec_tag,
        conditions: [{ id: "invalid-id", valueid: "condition-value-1"}],
        actions: [{ id: "invalid-id", valueid: "action-value-1"}]
    }
    decid015Response = await chai.request(host).post('/rule').send(reqBody);
    console.log(decid015Response.body)
});

When('I create a rule in table {string} with action that does not exist', async function (dec_tag) {
    const reqBody = {
        tableId: dec_tag,
        conditions: [{ id: "invalid-id", valueid: "condition-value-1"}],
        actions: [{ id: "invalid-id", valueid: "action-value-1"}]
    }
    decid015Response = await chai.request(host).post('/rule').send(reqBody);
    console.log(decid015Response.body)
});