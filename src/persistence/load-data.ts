import fs from 'fs';
import { DecisionTable } from '../types/decision-table';

const basePath = '../../fileStore/'

const loadTable = (tableId: string): DecisionTable | null => {
    try {
        const val : DecisionTable =  JSON.parse(fs.readFileSync(`${basePath}${tableId}.json`, 'utf8'));
        return val;
    } catch (err) {
        console.error(err)
        return null;
    }
}

export default loadTable;
