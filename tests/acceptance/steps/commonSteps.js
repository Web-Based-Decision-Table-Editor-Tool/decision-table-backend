const { startServer, shutdown, resetFileStore, isExecutingFirstTime } = require('./TestUtils')
const chai = require("chai");
const expect = require("chai").expect;
const { Given, Then, BeforeAll, AfterAll, Before } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');


const host = 'localhost:3000'
// start the server
BeforeAll({timeout: 15 * 1000}, async function (){
    try {
        await resetFileStore();
        await startServer();
    } catch (err) {
          console.log(err);
    }
})

AfterAll({timeout: 15 * 1000}, async function(){
    try {
    } catch (err) {
        console.log(err);
    }
})

/*
Background: 
'Before' normally executes before every scenario of every feature file
Therefore, tags is added so that 'Before' is only executed for the features identified in tags
More tags can be added for the features that require this logic to execute only before the first scenario

Behaviour: 
The logic resets the filestore, shutsdown the server and restarts the server. 
*/
Before({tags: "@DeleteDecisionTableFeature"}, async function () {
    try {
        // Only execute this logic before the first scenario of DeleteDecisionTableFeature
        if(isExecutingFirstTime()){
            await resetFileStore();
            await shutdown();
            await startServer();
        }
    } catch (err) {
          console.log(err);
    }
})

Before({tags: "@ChangeDecisionTableNameFeature"}, async function () {
    try {
        // Only execute this logic before the first scenario of DeleteDecisionTableFeature
        if(isExecutingFirstTime()){
            await resetFileStore();
            await shutdown();
            await startServer();
        }
    } catch (err) {
          console.log(err);
    }
})
 
Given('I am connected to the Decision_Table_Editor_Cloud_Services',  async function () {
    response = await chai.request(host).get("/");
    expect(response).to.have.status(200);
});

Given('Persistence layer is reset',  async function () {
    try {
        await resetFileStore();
    } catch (err) {
          console.log(err);
    }
});

Given('I have created decision table named {string} identified as {string}', async function(dec_name, dec_tag) {
    let tableId = await createDecTable(dec_name, "table description");
    expect(tableId).to.equal(dec_tag);
});


