import { Service } from 'typedi';
import decisionTablePersistence from "../persistence/decision-table.persistence";
import uuid4 from "uuid4"
import decisionTableService from './decision-table.service';
import { Condition } from '../types/condition';


@Service()
export default class conditionService{
   
    // passing dependencies
    constructor(private decisionTableService : decisionTableService,
                private persistence : decisionTablePersistence){
    
    }

    public async addCondition(tableId : string, name : string, type: string, valueList : string[]) : Promise<Condition>{
        
        //find table with id
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching Id exists, adding condition failed");
        }
        
        // validating only one of three correct types
        const conditionType = type.toLowerCase();
        if(!(conditionType === 'boolean' || conditionType ==='text' ||conditionType === 'numeric')){
            throw("Inavlid type. Must be one of: boolean, text, numeric");
        }

        //type boolean can have 2 values only
        if(type.toLowerCase() === 'boolean' && valueList.length != 2){
            throw("Invalid values for specified type");
        }
        // TODO: add validation for numeric type


        // Generate unique id
        const uuid = uuid4();

        // building condition object
        let condition : Condition = {
            id: uuid,
            name,
            type,
            valueList
        }

        // add condition to decTable
        table.conditions.push(condition);
        this.persistence.saveTable(table);

        return condition;
    }

    public async getCondition(tableId: string, conditionId: string) : Promise<Condition> {
        // find table with tableId
        const table = await this.decisionTableService.getTableById(tableId);

        // check if table exists
        if(table == null){
            throw("No table with matching Id exists, querying condition failed");
        }

        // get all conditions of the table
        const conditions : Condition[] = table.conditions;

        // find the condition with the specified conditionId
        const queriedCondition: Condition | undefined | null = conditions.find(condition => condition.id === conditionId);

        // check if condition with specified conditionId exists
        if (queriedCondition === undefined || queriedCondition === null){
            throw("No condition with matching conditionId exists, querying condition failed");
        }
        
        // return queried condition
        return queriedCondition;
    }

}