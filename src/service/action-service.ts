import { Action } from "../types/action";
import { getTableById, updateTable } from "./decisiontable-service";

export const addAction = (tableId: string, action: Action) : Action => {
    //TODO validate action object

    const table = getTableById(tableId);

    if(table == null){
        throw new Error(`table with id : ${tableId} doesn't exist`);
        // return {
        //     id: "1000",
        //     name: "testaction",
        //     items: []
        // }
    }

    table.actions.push(action);
    updateTable(table);
    return action;
}