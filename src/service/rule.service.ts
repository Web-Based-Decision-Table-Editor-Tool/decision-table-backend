import { Service } from 'typedi';
import decisionTablePersistence from "../persistence/decision-table.persistence";
import uuid4 from "uuid4"
import decisionTableService from './decision-table.service';


@Service()
export default class ruleService{
   
    // passing dependencies
    constructor(private decisionTableService : decisionTableService,
                private persistence : decisionTablePersistence){
    
    }

    public async addRule(tableId : string) : Promise<void>{
        
        //find table with id
        const table = await this.decisionTableService.getTableById(tableId);
        if(table == null){
            throw("No table with matching Id exists, adding condition failed");
        }
        
    }
}
