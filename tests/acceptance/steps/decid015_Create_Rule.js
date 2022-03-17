const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer, createDecTable } = require('./TestUtils');

chai.use(chaiHttp);
const host = 'localhost:3000';

var decid015Response;
var condition;
var action;
var rule;
var tableId;

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

Given('I have created decision table named {string} for adding rule', async function(dec_name) {
    tableId = await createDecTable(dec_name, "table description");
});

Given('I have a condition in this table named {string} with type {string} and values {string}', async function (con_name, con_type, con_vals) {
    decid015Response = await chai
        .request(host)
        .post("/condition")
        .send({ tableId: tableId, name: con_name, type: con_type, valueList: con_vals.split(',') });
        
    expect(decid015Response.body.id).to.not.equal(null);
    expect(decid015Response.body.id).to.not.equal(undefined);
    condition = decid015Response.body;
  });

Given('I have an action in this table of type {string} named {string} with action values: {string}', async function (action_type, action_name, action_values) {
    vals = action_values.split(",");
    let reqBody = {
        name: action_name,
        type: action_type,
        tableId: tableId, 
        valueList: vals
    };
    decid015Response = await chai.request(host).post('/action').send(reqBody);
    expect(decid015Response.body).to.have.property("id")
    actionID = decid015Response.body.id
    reqBody = {
        tableId : tableId,
        actionId: actionID
    }
    // Write code here that turns the phrase above into concrete actions
    decid015Response = await chai
        .request(host)
        .get("/action/" + actionID).send(reqBody);
    
    expect(decid015Response.body.name).to.equal(action_name)

    action = decid015Response.body;
  });

When('I create a rule in this table with condition {string} and condition value {string}, and action {string} and action value {string}', async function (con_name, con_num, action_name, action_num) {
    const reqBody = {
        tableId: tableId,
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
    expect(rule.conditions[0].itemid).to.equal(condition.id)
    expect(rule.conditions[0].valueid).to.equal(con_num)
    expect(rule.actions[0].itemid).to.equal(action.id)
    expect(rule.actions[0].valueid).to.equal(action_num)
  });

Then('I receive an error code as {int} for rule creation', function (code) {
    expect(decid015Response).to.have.status(code);
});

When('I create a rule in this table with condition that does not exist', async function () {
    const reqBody = {
        tableId: tableId,
        conditions: [{ id: "invalid-id", valueid: "condition-value-1"}],
        actions: [{ id: "invalid-id", valueid: "action-value-1"}]
    }
    decid015Response = await chai.request(host).post('/rule').send(reqBody);
});

When('I create a rule in this table with action that does not exist', async function () {
    const reqBody = {
        tableId: tableId,
        conditions: [{ id: "invalid-id", valueid: "condition-value-1"}],
        actions: [{ id: "invalid-id", valueid: "action-value-1"}]
    }
    decid015Response = await chai.request(host).post('/rule').send(reqBody);
});