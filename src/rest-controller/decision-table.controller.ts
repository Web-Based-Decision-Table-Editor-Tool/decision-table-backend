import { Service } from 'typedi';
import decisionTableService from '../service/decision-table.service';
import { Request, Response } from "express";
import { ITableResponse, ITableNameResponse } from '../types/interfaces';

@Service()
export class decisionTableController {

    constructor(private service : decisionTableService) {
    }


    public changeTableNameById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, name } = req.body;
            const response : ITableNameResponse = await this.service.changeTableName(id, name);
            
            const status = response.status;
            const tableName = response.name;
            res.status(status).json({ tableName, status});

        } catch {
            res.status(500);
        }
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

    public deleteTable = async (req: Request, res: Response): Promise<void> => {
        const tableId = req.params.id;
        const response = await this.service.deleteTable(tableId);
        if(this.isITableResponse(response)){
            const { id, status } = response;
            res.status(status).json({ id });
        }else{
            res.status(response.status).json(response);
        }
    }

    private isITableResponse(object: any): object is ITableResponse{
        return 'id' in object && 'note' in object;
    }

    public getTableNameById = async (req: Request, res: Response): Promise<void> => {
        const tableId = req.params.id;
        const response : ITableNameResponse = await this.service.getTableNameById(tableId);
        const { name, status } = response;
        res.status(status).json({ name, status });
    }
  
}