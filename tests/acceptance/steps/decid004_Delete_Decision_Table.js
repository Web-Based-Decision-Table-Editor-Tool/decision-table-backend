const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const { When, Then, Before } = require("@cucumber/cucumber");
const { resetFileStore, shutdown, startServer } = require('./TestUtils');


chai.use(chaiHttp);
const host = 'localhost:3000';

var decid004Response = null;

/*
 Background: 
 'Before' normally executes before every scenario of every feature file
 Therefore, tags is added so that 'Before' is only executed for the features identified in tags

 Behaviour: 
 The logic resets the filestore, shutsdown the server and restarts the server. 
 */
 let executeOnce = false;
 Before({tags: "@DeleteDecisionTableFeature", timeout: 15 * 2000}, async function () {
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

When('I delete the Decision Table {string}', async function(dec_tag){
    decid004Response = await chai.request(host).delete(`/table/${dec_tag}`);
});

When('I delete a decision table with invlaid tag {string}', async function(dec_tag){
    decid004Response = await chai.request(host).delete(`/table/${dec_tag}`);
});

Then('I receive identifier deleted as tag {string}', async function(dec_tag){
    expect(decid004Response.body.id).to.equal(dec_tag);
});

Then('I receive an error code for delete request as {int}', async function(dec_response_code){
    expect(decid004Response).to.have.status(dec_response_code);
});

Then('I receive an error code as {int} and error message as {string}', async function(dec_response_code, dec_msg){
    expect(decid004Response).to.have.status(dec_response_code);
    expect(decid004Response.body.msg).to.equal(dec_msg)
});




