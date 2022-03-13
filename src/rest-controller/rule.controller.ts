import { Service } from 'typedi';
import { Request, Response } from "express";
import ruleService from '../service/rule.service';

@Service()
export class ruleController {
    constructor(private ruleService : ruleService) {
    }

    public addRule = async (req: Request, res: Response): Promise<void> => {
        const { tableId, conditions, actions } = req.body;
        try {
            const rule = await this.ruleService.addRule(tableId, conditions, actions);
            res.status(201).json(rule);
            res.send();
        } catch (error) {
            console.log(error)
            res.status(400).send();
        }
    }

}
