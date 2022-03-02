import { Service } from 'typedi';
import decisionTablePersistence from "../persistence/decision-table.persistence";
import uuid4 from "uuid4"
import decisionTableService from './decision-table.service';
import { Action } from '../types/action';


@Service()
export default class actionService{
   
    constructor(private decisionTableService: decisionTableService, private persistence: decisionTablePersistence){
    
    }

    public async addAction(tableId : string, name : string, type: string, valueList : string[]) {
        
        //find table with id
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching Id exists, adding action failed");
        }
        
        
        const actionType = type.toLowerCase();
        if(!(actionType === 'boolean' || actionType ==='text' ||actionType === 'numeric')){
            throw("Inavlid type. Must be one of: boolean, text, numeric");
        }

        //type boolean can have 2 values only
        if(type.toLowerCase() === 'boolean' && valueList.length != 2){
            throw("Invalid values for specified type");
        }
        //TODO: add validation for numeric type


        //Generate unique id
        const uuid = uuid4();

        let action : Action = {
            id: uuid,
            name,
            type,
            valueList
        }

        // add action to decTable
        table.actions.push(action);
        this.persistence.saveTable(table);

        return uuid;
    }

    public async changeAction(tableId : string, oldActionName : string, newActionName : string, type: string, valueList : string[]) {
        
        //Find table with specified id
        const table = await this.decisionTableService.getTableById(tableId);

        if(table == null){
            throw("No table with matching id exists, cannot add actions to non-existent tables");
        }

        //Loop through the table actions
        for(let i = 0; i < table.actions.length; i++) {

            //If you find an action with the given actionId
            if(table.actions[i].name == oldActionName) {

                let updatedActionId = table.actions[i].id;

                //Replace the old attributes of the action with the new attributes if they are not empty
                if(newActionName) {
                    table.actions[i].name = newActionName;
                }

                if(type) {
                    table.actions[i].type = type;
                }

                if(valueList.length != 0) {
                    table.actions[i].valueList = valueList;

                }

                this.persistence.saveTable(table);
                return table.actions[i];
            }
         }

         // If this runs, action with that id not found
         throw("No action exists with name: " + oldActionName);
    }
}
