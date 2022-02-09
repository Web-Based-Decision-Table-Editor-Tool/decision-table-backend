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
        
        debugger;
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


    public async deleteAction(tableId: string, actionId: string) {

        //Find and load table by ID
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching id exists. You cannot delete action from non-existent tables");
        }

        
    }
}
