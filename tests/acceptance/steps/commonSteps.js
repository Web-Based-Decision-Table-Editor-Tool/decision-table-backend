const { startServer, resetFileStore } = require('./TestUtils')
const chai = require("chai");
const expect = require("chai").expect;
const { Given, Then, BeforeAll, AfterAll, Before, setDefaultTimeout } = require("@cucumber/cucumber");
const { createDecTable } = require('./TestUtils');

setDefaultTimeout(60 * 1000);

const host = 'localhost:3000'
// start the server
BeforeAll({timeout: 15 * 2000}, async function (){
    try {
        await resetFileStore();
        await startServer();
    } catch (err) {
          console.log(err);
    }
})

AfterAll({timeout: 15 * 2000}, async function(){
    try {
        await resetFileStore();
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


