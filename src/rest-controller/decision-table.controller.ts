import decisionTableService from '../service/decision-table.service';
import { Request, Response } from "express";
import { ITableResponse } from '../types/interfaces';

export class decisionTableController {

    service: decisionTableService;
    constructor() {
      this.service = new decisionTableService();
    }


    public changeTableNameById = async (req: Request, res: Response): Promise<void> => {
        try {
            //1 for PUT
            debugger;
            const { id, name } = req.body;
            const response : ITableResponse = await this.service.changeTableName(id, name);
            
            const status = response.status;
            const responseTableID = response.id;
            res.status(status).json({ responseTableID });
            
        } catch {
            res.status(500);
        }
    }


    public addTable = async (req: Request, res: Response): Promise<void> => {
        try {
            //1 for POST
            debugger;
            const { name, note } = req.body;
            const response : ITableResponse = await this.service.addTable(name, note);
            const { id, status } = response;
            res.status(status).json({ id });
        } catch {
            res.status(500);
        }
    }

    public deleteTable = async (req: Request, res: Response): Promise<void> => {
        //1 for DELETE
        debugger;
        const tableId = req.params.id;
        const response : ITableResponse = await this.service.deleteTable(tableId);
        const { id, status } = response;
        res.status(status).json({ id });
    }
}