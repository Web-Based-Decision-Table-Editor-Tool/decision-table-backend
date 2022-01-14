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
            const { name, note } = req.body;
            const response : ITableResponse = await this.service.addTable(name, note);
            const { id, status } = response;
            res.status(status).json({ id });
        } catch {
            res.status(500);
        }
    }
}