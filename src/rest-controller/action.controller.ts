import { Service } from 'typedi';
import { Request, Response } from "express";
import actionService from '../service/action.service';
import { ErrorResponse } from '../types/interfaces';
import { Action } from '../types/action';

@Service()
export class actionController {
    constructor(private actionService : actionService) {
    }

    public addAction = async (req: Request, res: Response): Promise<void> => {
      try {
          debugger;
          const { tableId, name , type, valueList } = req.body;
          const action = await this.actionService.addAction(tableId, name, type, valueList);
          const id = action.id;
          const response = { id: id, msg: `action created with id: ${id}`, status: 201, action: action};
          res.status(201).json(response);
      } catch (error) {
          const errorResponse = { msg: error, status: 400}
          res.status(400).json(errorResponse);
          console.log(error);
      }
    }

    public updateActionById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { tableId, oldActionName, newActionName, type, valueList } = req.body;
            const changedAction = await this.actionService.changeAction(tableId, oldActionName, newActionName, type, valueList);
            const response = { msg: `Action with ID: ${changedAction.id} changed`, status: 200, actionId: changedAction.id, actionName: changedAction.name, valueList: changedAction.valueList, actionType: changedAction.type};
            res.send(response);
        } catch (error) {
            const errorResponse = { msg: error, status: 400}
            res.status(400).json(errorResponse);
            console.log(error);
        }
    }

    public getActionById = async (req: Request, res: Response): Promise<void> => {
        try{
            const {tableId, actionId} = req.body;
            const action: Action = await this.actionService.getActionById(actionId, tableId);
            res.status(200).json(action)
        } catch (error){
            res.status(404).json({msg: error})
        }
    }

    public deleteAction = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, actionName } = req.body;
            let deletedActionId = await this.actionService.deleteAction(id, actionName);
            const response = { id: deletedActionId, msg: `Action with id: ${deletedActionId} deleted`, status: 204};
            res.send(response)
        } catch (error) {
            console.log(error);
        }

    }

}
