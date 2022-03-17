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

    public getRuleById = async (req: Request, res: Response): Promise<void> => {
        const { tableId, ruleId } = req.body;
        try {
            const rule = await this.ruleService.getRuleById(tableId, ruleId);
            const response = {msg: `Rule with ID: ${rule.id} changed`, status: 200, rule:rule};
            res.send(response);
        } catch (error) {
            console.log(error)
            res.status(400).send();
        }
    }

    public deleteRuleById = async (req: Request, res: Response): Promise<void> => {
        const { tableId, ruleId } = req.body;
        try {
            const removedRuleId = await this.ruleService.deleteRuleById(tableId, ruleId);
            const response = {msg: `Rule with ID: ${removedRuleId} deleted`, status: 200};
            res.send(response);
        } catch (error) {
            console.log(error)
            res.status(400).send();
        }
    }

    public updateRuleById = async (req: Request, res: Response): Promise<void> => {
        const { tableId, ruleId, conditions, actions } = req.body;
        try {
            const rule = await this.ruleService.updateRule(tableId, ruleId, conditions, actions);
            res.status(201).json(rule);
            res.send();
        } catch (error) {
            console.log(error)
            res.status(400).send();
        }
    }

}
