import { ITableResponse, ITableNameResponse } from "../types/interfaces";
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

        //2 for POST
        debugger;
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

        //3 for POST
        debugger;
        if(this.lastId == -1){
            this.lastId = await this.persistence.getLastAssignedId();
        }
        this.lastId++;
        return `dt_${this.lastId}`;
    }

    public async deleteTable(id: string): Promise<ITableResponse> {
        //2 FOR DELETE
        debugger;
        try {
            this.persistence.deleteTableWithId(id);
            return { id, status: 200}
        } catch (error) {
            return { id: "", status: 404}
        }
    }

    public async changeTableName(id: string, newName: string): Promise<ITableNameResponse> {
        debugger;
        try {
            const name = await this.persistence.changeTableNameById(id, newName);
            return { name, status: 200}
        } catch (error) {
            return { name: "", status: 404}
        }
    }

    public async getTableNameById(id: string): Promise<ITableNameResponse> {
        debugger;
        try {
            const name = await this.persistence.getTableNameById(id);
            return {name, status: 200}
        } catch (error) {
            return { name: "", status: 404}
        }
    }

    
}
