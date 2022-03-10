const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before, Given } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid007Response = null;

/*
 Background: 
 'Before' normally executes before every scenario of every feature file
 Therefore, tags is added so that 'Before' is only executed for the features identified in tags

 Behaviour: 
 The logic resets the filestore, shutsdown the server and restarts the server. 
 */
 let executeOnce = false;
 Before({tags: "@ChangeActionFeature", timeout: 15 * 2000}, async function () {
     try {
         // Only execute this logic before the first scenario of DeleteDecisionTableFeature
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

 Given('I have added an action of type {string} named {string} with {string} to decision table with id {string}', async function(old_action_type, old_action_name, old_value_list, dec_tag){

    //Split into an array of strings if !,! sequence detected,
    //Else leave it as it is
    old_value_list = old_value_list.split("!,!")

    let reqBody = {
        name: old_action_name,
        type: old_action_type,
        tableId: dec_tag,
        valueList: old_value_list
    };
    decid007Response = await chai.request(host).post('/action').send(reqBody);
});

When('I change the action named {string} to type {string} with {string} in decision table with id {string}', async function(old_action_name, new_action_type, new_value_list, dec_tag){

    //Split into an array of strings if !,! sequence detected,
    //Else leave it as it is
    new_value_list = new_value_list.split("!,!")

    let reqBody = {
        tableId: dec_tag,
        oldActionName: old_action_name,
        newActionName: "",
        type: new_action_type,
        valueList: new_value_list
    };
    decid007Response = await chai.request(host).put('/action').send(reqBody);
});

When('I change an action of name {string} to name {string} in decision table with id {string}', async function(old_action_name, new_action_name, dec_tag){


    let reqBody = {
        tableId: dec_tag,
        oldActionName: old_action_name,
        newActionName: new_action_name,
        type: "",
        valueList: ""
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
