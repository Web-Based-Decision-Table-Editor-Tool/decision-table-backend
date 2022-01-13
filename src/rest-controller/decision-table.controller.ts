import decisionTableService from '../service/decision-table.service';
import { Request, Response } from "express";
import { ITableResponse } from '../types/interfaces';

export class decisionTableController {

    service: decisionTableService;
    constructor() {
      this.service = new decisionTableService();
    }

    public addTable = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log("request received")
            console.log(req.body);
            const { name, note } = req.body;
            const response : ITableResponse = await this.service.addTable(name, note);
            const { id, status } = response;
            res.status(status).json({ id });
        } catch  {
            res.status(500);
        }
    }
        // try {
        //   const { task, user } = req.body;
        //   const state = this.taskStateChecker(task["state"]);
        //   if (state === undefined) {
        //     res.status(500).json({ message: "Please send in the task state" });
        //   }
        //   const response: IResponse = await this.service.addTask(
        //     { ...task, state },
        //     user
        //   );
        //   const { message, status } = response;
        //   res.status(status).json({ message });
        // } catch (err) {
        //   res.status(500).json({ message: "failed" });
        // }
    //   };
}