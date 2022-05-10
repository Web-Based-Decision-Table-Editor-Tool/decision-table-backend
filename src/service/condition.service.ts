import { Service } from 'typedi';
import decisionTablePersistence from "../persistence/decision-table.persistence";
import uuid4 from "uuid4"
import decisionTableService from './decision-table.service';
import { Condition } from '../types/condition';
import data from '../adminConfig.json';
import { ValueItem } from '../types/value-item';



@Service()
export default class conditionService{

    // passing dependencies
    constructor(private decisionTableService : decisionTableService,
                private persistence : decisionTablePersistence){
    
    }
    private getConditonValueItems(valueList: string[]) : ValueItem[] {
        //Generate id for each value item
        let item = 1;
        const valueItems: ValueItem[] = []
        valueList.forEach(element => {
            const id = "condition-value-" + item;
            item++;
            let val: ValueItem = {
                id: id,
                value: element
            }
            valueItems.push(val);
        });
        return valueItems;
    }
    public async addCondition(tableId : string, name : string, type: string, valueList : string[]) : Promise<Condition>{
        
        const maxConditionsInTable = (<any>data).maxConditionsInTable;
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

        const vals = this.getConditonValueItems(valueList);
        // building condition object
        let condition : Condition = {
            id: uuid,
            name,
            type,
            valueList: vals
        }

        // add condition to decTable
        if(table.conditions.length < maxConditionsInTable) {
            table.conditions.push(condition);
            this.persistence.saveTable(table);
            return condition;
        } else {
            throw("Max number of conditions in a table reached")
        }
        
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


    public async updateCondition(tableId : string, conditionId: string, name : string, type: string, valueList : string[]) : Promise<Condition>{
        
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

        //Get our old condition object, so we can remove it from the table
        const oldCondition : Condition = await this.getCondition(tableId, conditionId);

        // Remove old condition from the table
        const index = table.conditions.indexOf(oldCondition);
        table.conditions.splice(index,1);

        // Use same ID as previous condition for our new condition (because we are overwriting it)
        const uuid = conditionId;
        const valitems = this.getConditonValueItems(valueList)
        // building the new condition object
        let newCondition : Condition = {
            id: uuid,
            name,
            type,
            valueList: valitems
        }

        //Add new, updated condition to the table
        table.conditions.push(newCondition);
        this.persistence.saveTable(table);

        return newCondition;
    }

    public async deleteCondition(tableId : string, conditionId: string) : Promise<Condition>{
        
        //find table with id
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching Id exists, adding condition failed");
        }
        
        //Get our old condition object, so we can remove it from the table
        const oldCondition : Condition = await this.getCondition(tableId, conditionId);

        // Remove old condition from the table
        const index = table.conditions.indexOf(oldCondition);
        table.conditions.splice(index,1);

        //Save our table back into the file system (overwritting it, so the old condition removed)
        this.persistence.saveTable(table);

        return oldCondition;
    }

}
