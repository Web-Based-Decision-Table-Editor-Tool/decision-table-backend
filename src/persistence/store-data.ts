import fs from 'fs';
import { DecisionTable } from '../types/decision-table';

const basePath = '../../fileStore/';

const storeTable = (table: DecisionTable) => {
    try {
        fs.writeFileSync(`${basePath}${table.id}.json`, JSON.stringify(table))
    } catch (err) {
        console.error(err)
    }
}

export default storeTable;
