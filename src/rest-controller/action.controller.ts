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
          debugger;
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
        res.sendStatus(204);
    }

    public getActionById = async (req: Request, res: Response): Promise<void> => {
        res.sendStatus(204);
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
        //res.sendStatus(204);
    }

}