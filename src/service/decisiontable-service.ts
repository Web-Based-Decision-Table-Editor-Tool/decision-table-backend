import { table } from "console";
import e from "express";
import loadTable from "../persistence/load-data";
import storeTable from "../persistence/store-data";
import { DecisionTable } from "../types/decision-table";

export const addDecisionTable = (dcTable: DecisionTable) => {

}

export const getTableById = (id: string) => {
    const table = loadTable(id);
    return table;
}

export const updateTable = (table : DecisionTable) => {
    storeTable(table);
}
