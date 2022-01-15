import fs from 'fs';
import { DecisionTable } from '../types/decision-table';

export default class decisionTablePersistence{
    
    baseDir = './fileStore/'
    
    constructor(){
    }

    public loadTable(tableId: string): DecisionTable | null {
        debugger;
        try {
            const val : DecisionTable =  JSON.parse(fs.readFileSync(`${this.baseDir}${tableId}.json`, 'utf8'));
            return val;
        } catch (err) {
            console.error(err)
            return null;
        }
    }

    public saveTable(table: DecisionTable) {
        //4 for POST
        debugger;
        //check if file store exists, if not then create it
        this.verifyFileStore();
        try {
            fs.writeFileSync(`${this.baseDir}${table.id}.json`, JSON.stringify(table))
        } catch (err) {
            console.error(err)
        }
    }

    public async getAllIds(): Promise<string[]> {
        this.verifyFileStore();
        const files = await fs.promises.readdir(this.baseDir);
        const tableIds = files.filter((file) => { 
            return file.slice(-5) == '.json'
        });
        return tableIds;
    }

    public async getLastAssignedId(): Promise<number> {
        const tableIds = await this.getAllIds()
        if(tableIds.length == 0){
            return 0;
        }

        const ids = tableIds.map((element) => {
            return element.slice(0, -5);
        });

        //sort ids
        ids.sort();

        //extract last assigned id
        const lastFile = ids[ids.length-1];
        const lastId = lastFile.split("_")[1];
        return Number(lastId);
    }
    
    public async deleteTableWithId(id: string){
        //3 for DELETE
        debugger;
        fs.unlinkSync(`${this.baseDir}${id}.json`);
    }

    private verifyFileStore(){
        if(!fs.existsSync(this.baseDir)){
            fs.mkdirSync(this.baseDir);
        }
    }

    public async changeTableNameById(id: string, newName: string) {
        console.log("hello");
        console.log(id);
        console.log(newName);
    }
}
