import { Action } from "./action";

export interface DecisionTable{
    id: string,
    name: string,
    note: string,
    email: string,
    lastUsedDate: Date,
    // actions: Action[]
}
