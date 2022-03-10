import { Action } from "./action";
import { Condition } from "./condition";

export interface DecisionTable{
    id: string,
    name: string,
    note: string,
    email: string,
    lastUsedDate: Date,
    actions: Action[]
    conditions: Condition[]
}
