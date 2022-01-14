import { ITableResponse } from "../types/interfaces";
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
        if(this.lastId == -1){
            this.lastId = await this.persistence.getLastAssignedId();
        }
        this.lastId++;
        return `dt_${this.lastId}`;
    }

    public async deleteTable(id: string): Promise<ITableResponse> {
        try {
            this.persistence.deleteTableWithId(id);
            return { id, status: 200}
        } catch (error) {
            return { id: "", status: 404}
        }
    }
}
