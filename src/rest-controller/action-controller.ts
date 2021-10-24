import express from 'express';
import { addAction } from '../service/action-service';

var actionController = express.Router();

actionController.get('/test', async function(req, res){
    res.send('Test method works!');
});

actionController.post('/action/:tableId', async function(req, res){
    const testAction = {
        id: "0",
        name: "dummy action",
        items: [] 
    };
    const action = addAction(req.params.tableId, testAction);
    res.send(action);
});

export default actionController;
