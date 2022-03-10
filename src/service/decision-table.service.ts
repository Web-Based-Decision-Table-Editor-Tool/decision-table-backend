import { Service } from 'typedi';
import { ITableResponse, ITableNameResponse, ErrorResponse } from "../types/interfaces";
import { DecisionTable } from "../types/decision-table";
import decisionTablePersistence from "../persistence/decision-table.persistence";

@Service()
export default class decisionTableService{
    lastId: number;
    
    constructor(private persistence : decisionTablePersistence){
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
            lastUsedDate : new Date(),
            actions: [],
            conditions: []
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
            // disabled & may be removed -> now creating a table after deleting will still increment the id
            //if(id == `dt_${this.lastId}`){
                //this.lastId = await this.persistence.getLastAssignedId();
            //}
            return {id, status: 200}
        }else{
            return { msg: `Unable to delete file with id:${id}`, status: 404}
        }
    }

    public async changeTableName(id: string, newName: string): Promise<ITableNameResponse> {
        try {
            const name = await this.persistence.changeTableNameById(id, newName);
            return { name, status: 201}
        } catch (error) {
            return { name: "", status: 400}
        }
    }

    public async getTableNameById(id: string): Promise<ITableNameResponse> {
        try {
            const name = await this.persistence.getTableNameById(id);
            return {name, status: 200}
        } catch (error) {
            return { name: "", status: 404}
        }
    }

    public async getTableById(id: string): Promise<DecisionTable | null> {
        try {
            const dt = await this.persistence.loadTable(id);
            return dt;
        } catch (error) {
            return null;
        }
    }
    
}
