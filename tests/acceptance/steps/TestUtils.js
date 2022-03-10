const chai = require("chai");
const chaiHttp = require("chai-http");
const child_process = require("child_process");
const fs = require('fs');
const path = require('path');

chai.use(chaiHttp);

const host = 'localhost:3000';
var npmStart = null;

async function startServer() {
  npmStart = child_process.spawn('npm', ["start"]);

  npmStart.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  npmStart.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  npmStart.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  let serverReady = false;
  while (!serverReady) {
    try {
      await chai.request(host).get('/');
      serverReady = true;
    } catch (err) {}
  }
}

async function shutdown() {
  npmStart.kill();
  try {
    await chai.request(host).get('/shutdown');
  } catch (err) {}
}

//ref: https://stackoverflow.com/questions/27072866/how-to-remove-all-files-from-directory-without-removing-directory-in-node-js
async function resetFileStore() {
  const directory = './fileStore';

  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  })
}

async function createDecTable(dec_name, dec_note){
  let response = await chai
  .request(host)
  .post("/table")
  .send({ name: dec_name, note: dec_note});

  return response.body.id;
}

module.exports = { startServer, shutdown, resetFileStore, createDecTable };
