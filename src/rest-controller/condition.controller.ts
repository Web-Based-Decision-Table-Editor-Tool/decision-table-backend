import { Service } from 'typedi';
import { Request, Response } from "express";
import conditionService from '../service/condition.service';
import { ErrorResponse, IConditionResponse } from '../types/interfaces';
import { Condition } from '../types/condition';

@Service()
export class conditionController {

    // passing dependencies
    constructor(private conditionService: conditionService) {
    }

    public addCondition = async (req: Request, res: Response): Promise<void> => {
        try{
            // parsing request body attributes
            const { tableId, name, type, valueList } = req.body;

            // logging info
            console.log(tableId, name);

            // requests service to add condition and get id of added condition
            const id = await this.conditionService.addCondition(tableId, name, type, valueList);
            
            // build response object
            const response : IConditionResponse = { msg: `condition created with id: ${id}`, status: 200 };
            const status = response.status;

            // send response
            res.status(status).json(response);
        } catch(error){
            // logging caught error
            console.log(error);

            // sending error as response and error status
            res.status(500).send(error);
        }
    }

    public getConditionById = async (req: Request, res: Response): Promise<void> => {
        try{
            // parsing request body attributes
            const { tableId, conditionId } = req.body;

            // logging info
            console.log(`Requested condition with tableId: ${tableId} & conditionId: ${conditionId}`);
            
            // getting requested condition from service layer
            const response : Condition = await this.conditionService.getCondition(tableId, conditionId);
    
            // sending condition as response
            res.status(200).json(response);
        } catch(error){
            // logging caught error
            console.log(error);

            // sending error as response and error status
            res.status(404).send(error);
        }

    }

    public updateConditionById = async (req: Request, res: Response): Promise<void> => {
        try{
            // parsing request body attributes
            const { tableId, conditionId, name, type, valueList } = req.body;

            // requests service to add update and get id of updated condition
            const id = await this.conditionService.updateCondition(tableId, conditionId, name, type, valueList);
            
            // build response object
            const response : IConditionResponse = { msg: `condition updated with id: ${id}`, status: 200 };
            const status = response.status;

            // send response
            res.status(status).json(response);
        } catch(error){
            // logging caught error
            console.log(error);

            // sending error as response and error status
            res.status(500).send(error);
        }
    }

    public deleteCondition = async (req: Request, res: Response): Promise<void> => {
        try{
            // parsing request body attributes
            const { tableId, conditionId } = req.body;

            // requests service to add update and get id of updated condition
            const id = await this.conditionService.deleteCondition(tableId, conditionId);
            
            // build response object
            const response : IConditionResponse = { msg: `condition deleted with id: ${id}`, status: 200 };
            const status = response.status;

            // send response
            res.status(status).json(response);
        } catch(error){
            // logging caught error
            console.log(error);

            // sending error as response and error status
            res.status(500).send(error);
        }
    }

}
