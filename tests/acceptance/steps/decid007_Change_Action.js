const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before, Given } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid007Response = null;
var tableId;

 Given("I have created decision table named {string} for updating action", async function(dec_name){
    tableId = await createDecTable(dec_name, "table description");
});

 Given('I have added an action of type {string} named {string} with {string} to decision table', async function(old_action_type, old_action_name, old_value_list){

    //Split into an array of strings if !,! sequence detected,
    //Else leave it as it is
    old_value_list = old_value_list.split("!,!")

    let reqBody = {
        name: old_action_name,
        type: old_action_type,
        tableId: tableId,
        valueList: old_value_list
    };
    decid007Response = await chai.request(host).post('/action').send(reqBody);
});

When('I change the action named {string} to type {string} with {string} in decision table', async function(old_action_name, new_action_type, new_value_list){

    //Split into an array of strings if !,! sequence detected,
    //Else leave it as it is
    new_value_list = new_value_list.split("!,!")

    let reqBody = {
        tableId: tableId,
        oldActionName: old_action_name,
        newActionName: "",
        type: new_action_type,
        valueList: new_value_list
    };
    decid007Response = await chai.request(host).put('/action').send(reqBody);
});

When('I change an action of name {string} to name {string} for action with type {string} and values {string} in decision table', async function(old_action_name, new_action_name, type, value_list){

    values = value_list.split("!,!")

    let reqBody = {
        tableId: tableId,
        oldActionName: old_action_name,
        newActionName: new_action_name,
        type: type,
        valueList: values
    };
    decid007Response = await chai.request(host).put('/action').send(reqBody);
});

Then('I receive new name matching {string}', async function(new_action_name){
    expect(decid007Response.body.actionName).to.equal(new_action_name)
});

Then('I recieve new type matching {string}', async function(new_action_type){
    expect(decid007Response.body.actionType).to.equal(new_action_type)
});

Then('I receive a success code {int} for change action', async function(action_response_code){
    expect(decid007Response.body.status).to.equal(action_response_code)
});
