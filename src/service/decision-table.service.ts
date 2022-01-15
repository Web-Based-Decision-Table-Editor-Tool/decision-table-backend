import { ErrorResponse, ITableResponse } from "../types/interfaces";
import { DecisionTable } from "../types/decision-table";
import decisionTablePersistence from "../persistence/decision-table.persistence";

export default class decisionTableService{
    lastId: number;
    persistence: decisionTablePersistence
    
    constructor(){
        this.persistence = new decisionTablePersistence();
        this.lastId = -1;
    }

    public async addTable(name: string, note: string): Promise<ITableResponse> {
        return await this.addNewTable(name, note);
    }

    private async addNewTable(name: string, note: string){
        //reject empty name
        if(name.trim().length == 0){
            return {id: "", status: 400}
        }

        const id = await this.generateTableId()
        const table : DecisionTable = {
            id,
            name,
            note,
            email : "",
            lastUsedDate : new Date()
        }

        this.persistence.saveTable(table);
        return { id: table.id, status: 201};
    }

    private async generateTableId(){
        if(this.lastId < 0){
            this.lastId = await this.persistence.getLastAssignedId();
        }
        this.lastId++;
        return `dt_${this.lastId}`;
    }

    public async deleteTable(id: string): Promise<ITableResponse | ErrorResponse> {
        let isDeleted = this.persistence.deleteTableWithId(id);
        if(isDeleted){
            if(id == `dt_${this.lastId}`){
                this.lastId = await this.persistence.getLastAssignedId();
            }
            return {id, status: 200}
        }else{
            return { msg: `Unable to delete file with id:${id}`, status: 404}
        }
    }
}
