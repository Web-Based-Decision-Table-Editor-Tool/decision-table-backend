const { startServer, resetFileStore } = require('./TestUtils')
const chai = require("chai");
const expect = require("chai").expect;
const { Given, BeforeAll, AfterAll } = require("@cucumber/cucumber");

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




