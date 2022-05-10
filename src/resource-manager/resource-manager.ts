import { Service } from 'typedi';
import fs from 'fs';
import data from '../adminConfig.json';

@Service()
export default class resourceManager{
    
    maxTables = (<any>data).maxTables;
    tableSaveDir = (<any>data).tableSaveDir;

    constructor(){
    }
    
    public performGarbageCollection = () => {
        const filenames = fs.readdirSync(this.tableSaveDir)
        const numOfTables = filenames.length;
        
        // if tables within maximum allowed then no need for garbage collection
        if( numOfTables<=this.maxTables ){
            return;
        }

        // to store filename and its last modified time
        let fileModifiedTimes : {filename: string, mtime: Date}[] = []

        // get modified time for each file
        filenames.forEach((filename)=>{
            const stats = fs.statSync(this.tableSaveDir + filename);
            const timeObj = {filename, mtime: stats.mtime}
            fileModifiedTimes.push(timeObj)
        });

        // sort files by assending order of modified time
        fileModifiedTimes = fileModifiedTimes.sort((objA, objB) => objA.mtime.getTime() - objB.mtime.getTime(),);

        const numOfTablesToDelete = numOfTables-this.maxTables;
       
        // delete oldest modified files until max no. of tables satisfied
        console.log(`ResourceManager.GarbageCollector: Removing ${numOfTablesToDelete} table(s) to satisfy max number of tables constraint.`)
        for( let i = 0; i<numOfTablesToDelete; i++ ){
            const fileNameToDelete = fileModifiedTimes[i].filename
            fs.unlink(this.tableSaveDir + fileNameToDelete, (err) => {
                if(err){
                    throw(err)
                }
                console.log(`ResourceManager.GarbageCollector: Removed a table with oldest modified date (filename: ${fileNameToDelete})`)
            });
        }
    }
}
