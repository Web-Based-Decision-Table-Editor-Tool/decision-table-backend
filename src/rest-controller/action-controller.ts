import express from 'express';

var actionController = express.Router();

actionController.get('/test', async function(req, res){
    res.send('Test method works!');
});

export default actionController;
