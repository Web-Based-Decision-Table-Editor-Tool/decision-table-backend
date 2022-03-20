import { Service } from 'typedi';
import decisionTablePersistence from "../persistence/decision-table.persistence";
import uuid4 from "uuid4"
import decisionTableService from './decision-table.service';
import { Action } from '../types/action';
import { ValueItem } from '../types/value-item';


@Service()
export default class actionService{
   
    constructor(private decisionTableService: decisionTableService, 
                private persistence: decisionTablePersistence){
    
    }

    private getActionItemsFromValues( valueList : string[]): ValueItem[] {
        //Generate id for each value item
        let item = 1;
        const valueItems: ValueItem[] = []
        valueList.forEach(element => {
            const id = "action-value-" + item;
            item++;
            let val: ValueItem = {
                id: id,
                value: element
            }
            valueItems.push(val);
        });
        return valueItems;
    }

    public async addAction(tableId : string, name : string, type: string, valueList : string[]) {
        
        //find table with id
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching Id exists, adding action failed");
        }
        
        if(valueList == null || valueList == undefined || valueList.length == 0){
            throw("Invalid values for specified type");
        }
        
        const actionType = type.toLowerCase();
        if(!(actionType === 'boolean' || actionType ==='text' || actionType === 'numeric')){
            throw("Invalid type. Must be one of: boolean, text, numeric");
        }

        //type boolean can have 2 values only
        if(type.toLowerCase() === 'boolean' && valueList.length != 2){
            throw("Invalid values for specified type");
        }

        //TODO: add validation for numeric type


        //Generate unique id
        const uuid = uuid4();

        const valueItems = this.getActionItemsFromValues(valueList)

        let action : Action = {
            id: uuid,
            name,
            type,
            valueList: valueItems
        }

        // add action to decTable
        table.actions.push(action);
        this.persistence.saveTable(table);

        return action;
    }

    public async changeAction(tableId : string, actionId : string, newActionName : string, type: string, valueList : string[]) {
        
        //Find table with specified id
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching id exists, cannot add actions to non-existent tables");
        }
        
        type = type.toLowerCase();
        if(!(type === 'boolean' || type ==='text' || type === 'numeric')){
            throw("Invalid type. Must be one of: boolean, text, numeric");
        }
        //type boolean can have 2 values only
        if(type.toLowerCase() === 'boolean' && valueList.length != 2){
            throw("Invalid values for specified type");
        }

        console.log(actionId);

        //Loop through the table actions
        for(let i = 0; i < table.actions.length; i++) {

            //If you find an action with the given actionId
            if(table.actions[i].id == actionId) {

                //Replace the old attributes of the action with the new attributes if they are not empty
                if(newActionName) {
                    table.actions[i].name = newActionName;
                }

                if(type) {
                    table.actions[i].type = type;
                }

                if(valueList.length != 0) {
                    table.actions[i].valueList = this.getActionItemsFromValues(valueList);
                }

                this.persistence.saveTable(table);
                return table.actions[i];
              
            }
         }

         // If this runs, action with that id not found
         throw("No action exists with id: " + actionId);
    }
  
    public async deleteAction(tableId: string, actionId: string) {

        //Find and load table by ID
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching id exists. You cannot delete action from non-existent tables");
        }

        //Loop through the table actions
        for(let i = 0; i < table.actions.length; i++) {

            //If you find an action with the given actionId
            if(table.actions[i].id == actionId) {
                let removedActionId = table.actions[i].id
                //Remove it from the actions array, save table and return actionId
                table.actions.splice(i, 1);
                this.persistence.saveTable(table);
                return removedActionId;
            }
         }

         // If this runs, action with that id not found
         throw("No action exists with id: " + actionId)

    }
  
    public async getActionById(actionId: any, tableId: any): Promise<Action> {
        //find table with id
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching Id exists, querying action failed");
        }
        for (let index = 0; index < table.actions.length; index++) {
            const action = table.actions[index];
            if(action.id === actionId){
                return action;
            }
        }
        throw(`Unable to find action with id ${actionId} in table ${tableId}`);
    }
  
}

