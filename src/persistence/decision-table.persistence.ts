import { Service } from 'typedi';
import fs from 'fs';
import { DecisionTable } from '../types/decision-table';

@Service()
export default class decisionTablePersistence{
    
    baseDir = './fileStore/'
    
    constructor(){
    }

    public loadTable(tableId: string): DecisionTable | null {
        try {
            const val : DecisionTable =  JSON.parse(fs.readFileSync(`${this.baseDir}${tableId}.json`, 'utf8'));
            return val;
        } catch (err) {
            console.error(err)
            return null;
        }
    }

    public saveTable(table: DecisionTable) {
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
    
    public deleteTableWithId(id: string): boolean{
        let filePath = `${this.baseDir}${id}.json`
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            return true;
        }else{
            return false;
        }
    }

    private verifyFileStore(){
        if(!fs.existsSync(this.baseDir)){
            fs.mkdirSync(this.baseDir);
        }
    }

    public async changeTableNameById(id: string, newName: string): Promise<string> {

        if(newName == "") {
            throw("Cannot set table name to empty string")
        }
        
        const dt : DecisionTable | null = this.loadTable(id);
        
        if(dt == null) {
            throw("No such table with matching ID exists. No changes made.")
        } else {
            dt.name = newName;
            this.saveTable(dt);
            return dt.name;
        }
    }

    public async getTableNameById(id: string): Promise<string> {

        const dt : DecisionTable | null = this.loadTable(id);

        if(dt == null) {
            throw("No such table with matching ID exists. No changes made.")
        } else {
            return dt.name;
        }

    }
}
