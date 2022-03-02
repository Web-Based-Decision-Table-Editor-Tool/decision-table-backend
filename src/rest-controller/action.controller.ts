import { Service } from 'typedi';
import { Request, Response } from "express";
import actionService from '../service/action.service';
import { ErrorResponse } from '../types/interfaces';

@Service()
export class actionController {
    constructor(private actionService : actionService) {
    }

    public addAction = async (req: Request, res: Response): Promise<void> => {
      try {
          const { tableId, name , type, valueList } = req.body;
          console.log(tableId, name);
          const id = await this.actionService.addAction(tableId, name, type, valueList);
          const response = { msg: `action created with id: ${id}`, status: 200};
          res.send(response)
      } catch (error) {
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
            console.log(error);
        }
    }

    public getActionById = async (req: Request, res: Response): Promise<void> => {
        res.sendStatus(204);
    }

    public deleteAction = async (req: Request, res: Response): Promise<void> => {
        res.sendStatus(204);
    }

}