import { Service } from 'typedi';
import { Request, Response } from "express";
import ruleService from '../service/rule.service';

@Service()
export class ruleController {
    constructor(private ruleService : ruleService) {
    }

    public addRule = async (req: Request, res: Response): Promise<void> => {
        const { tableId, conditions, actions } = req.body;
        console.log(tableId, conditions, actions);
    }

}
