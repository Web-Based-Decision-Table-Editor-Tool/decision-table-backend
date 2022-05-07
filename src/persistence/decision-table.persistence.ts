import { Service } from 'typedi';
import fs from 'fs';
import { DecisionTable } from '../types/decision-table';
import data from '../adminConfig.json';
import resourceManager from '../resource-manager/resource-manager';

@Service()
export default class decisionTablePersistence{
    
    baseDir = (<any>data).tableSaveDir;
    
    constructor(private resourceManager : resourceManager){
    }

    public loadTable(tableId: string): DecisionTable | null {
        try {
            const file = `${this.baseDir}${tableId}.json`;

            // load contents of file
            const val : DecisionTable =  JSON.parse(fs.readFileSync(file, 'utf8'));

            // update file stats to current time
            let changedModifiedTime = new Date();
            let changedAccessTime = new Date();
            
            // assign the new timestamps
            fs.utimesSync(file, changedAccessTime, changedModifiedTime);

            // return the decision table data
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
            const file = `${this.baseDir}${table.id}.json`;
            fs.writeFileSync(file, JSON.stringify(table))

            // update file stats to current time
            let changedModifiedTime = new Date();
            let changedAccessTime = new Date();
            
            // assign the new timestamps
            fs.utimesSync(file, changedAccessTime, changedModifiedTime);

            // perform garbage collection to ensure max no. of table constraint is being met
            this.resourceManager.performGarbageCollection();
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

    public async changeTableNoteById(id: string, newNote: string): Promise<string> {
        const dt : DecisionTable | null = this.loadTable(id);
        
        if(dt == null) {
            throw("No such table with matching ID exists. No changes made.")
        } else {
            dt.note = newNote;
            this.saveTable(dt);
            return dt.note;
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

    public async getTableNoteById(id: string): Promise<string> {
        const dt : DecisionTable | null = this.loadTable(id);
        if(dt == null) {
            throw("No such table with matching ID exists. No changes made.")
        } else {
            return dt.note;
        }

    }

    
}
