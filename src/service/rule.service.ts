import { Service } from 'typedi';
import decisionTablePersistence from "../persistence/decision-table.persistence";
import uuid4 from "uuid4"
import decisionTableService from './decision-table.service';
import { Rule, RuleApiInput, RuleItem } from '../types/rule';
import { table } from 'console';
import conditionService from './condition.service';
import actionService from './action.service';


@Service()
export default class ruleService{
   
    // passing dependencies
    constructor(private decisionTableService : decisionTableService,
                private conditionService: conditionService,
                private actionService: actionService,
                private persistence : decisionTablePersistence){
    
    }

    public async addRule(tableId : string, conditions: RuleApiInput[], actions: RuleApiInput[]) : Promise<Rule>{
        
        //find table with id
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching Id exists, adding condition failed");
        }

        if(actions.length == 0 || conditions.length == 0){
            throw("Rule must have at least 1 action and condition");
        }
        
        conditions.forEach(element => {
            if(element.id === undefined || element.id === null){
                throw("Invalid input, must specify id for condition to add rule")
            }
            if(element.valueid === undefined || element.valueid === null){
                throw("Invalid input, must specify value for condition to add rule")
            }
        });

        actions.forEach(element => {
            if(element.id === undefined || element.id === null){
                throw("Invalid input, must specify id for action to add rule")
            }
            if(element.valueid === undefined || element.valueid === null){
                throw("Invalid input, must specify value for action to add rule")
            }
        });
        let ruleConditions : RuleItem[] = []
        let ruleActions: RuleItem[] = []

        try {
            ruleConditions = await this.getConditionsForRule(tableId, conditions);
            console.log(ruleConditions)
        } catch (error) {
            console.log(error)
            throw("Error in querying condition(s) specified, verify that the specified ids are valid")
        }

        try {
            ruleActions = await this.getActionsForRule(tableId, actions);
            console.log(ruleActions)
        } catch (error) {
            console.log(error)
            throw("Error in querying action(s) specified, verify that the specified ids are valid")
        }

        const rule : Rule = {
            id: uuid4(),
            conditions: ruleConditions,
            actions: ruleActions
        }
        table.rules.push(rule);
        this.persistence.saveTable(table);
        return rule;
    }

    private async getConditionsForRule(tableid: string, conditions: RuleApiInput[]): Promise<RuleItem[]> {
        const conds: RuleItem[] = [];
        for(let cond of conditions){
            const res = await this.conditionService.getCondition(tableid, cond.id);
            const uuid = uuid4();
            const rItem : RuleItem = {
                itemid: uuid,
                item: res,
                valueid: cond.valueid
            }
            conds.push(rItem)
        }

        return conds;
    }

    private async getActionsForRule(tableid: string, actions: RuleApiInput[]): Promise<RuleItem[]> {
        const acts: RuleItem[] = [];
        for(let action of actions){
            const res = await this.actionService.getActionById(action.id, tableid);
            const uuid = uuid4();
            const rItem : RuleItem = {
                itemid: uuid,
                item: res,
                valueid: action.valueid
            }
            acts.push(rItem)
        }

        return acts;
    }
}

