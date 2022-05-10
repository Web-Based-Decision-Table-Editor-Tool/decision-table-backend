const chai = require("chai");
const expect = require("chai").expect;
const { When, Then } = require("@cucumber/cucumber");
const fs = require('fs');

var configFilePath = './src/adminConfig.json';
var decid019Response;
const host = 'localhost:3000';
let data = JSON.parse(fs.readFileSync(configFilePath));

When('I create Decision Tables in excess of 10 over the specified number in the configuration file', async function () {
    // config file path
    let maxTables = data.maxTables;
    let tablesToCreate = maxTables + 10;

    for(let i=0; i<tablesToCreate; i++){
        decid019Response = await chai
            .request(host)
            .post("/table")
            .send({ name: `table ${i}`, note: `table note ${i}`});
    }

});

Then('the number of tables created do not exceed the specified number in the configuration file', async function () {
    const numOfTables = fs.readdirSync(data.tableSaveDir).length
    expect(numOfTables).to.equal(data.maxTables)
});
