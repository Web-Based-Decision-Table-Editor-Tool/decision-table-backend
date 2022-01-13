import { ITableResponse } from "../types/interfaces";
import { DecisionTable } from "../types/decision-table";
import storeTable from "../persistence/store-data";

export default class decisionTableService{

    public async addTable(name: string, note: string): Promise<ITableResponse> {
        return await this.addNewTable(name, note);
    }

    private async addNewTable(name: string, note: string){
        console.log(`addNewTable called with ${name}, ${note}`);
        const table : DecisionTable = {
            id : `${name}_1`,
            name,
            note,
            email : "testEmail@test.com",
            lastUsedDate : new Date()
        }
        storeTable(table);
        return { id: table.id, status: 201};
    }
    // public async getTask(id: string): Promise<ITableResponse> {
    //     return await this.getTaskByID(id);
    // }
    
    // private async getTaskByID(id: string) {
    //     try {
    //       const filter = { _id: id };
    //       const task = await Task.findOne(filter);
    //       if (!task) {
    //         const message = "Task not found";
    //         const status = 500;
    //         return { message, status };
    //       }
    //       const status = 200;
    //       return { task: [task], status };
    //     } catch (err) {
    //       const message = "Error occured while adding task";
    //       const status = 404;
    //       return { message, status };
    //     }
    //  }
}
