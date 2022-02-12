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
            const response = await this.conditionService.addCondition(tableId, name, type, valueList);

            // send response
            res.status(200).json(response);
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
        // TODO: decid011
        res.sendStatus(204);
    }

    public deleteCondition = async (req: Request, res: Response): Promise<void> => {
        // TODO: decid012
        res.sendStatus(204);
    }

}
