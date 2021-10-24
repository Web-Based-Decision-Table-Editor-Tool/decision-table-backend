import { Action } from "./action";

export interface DecisionTable{
    id: string,
    description: string,
    email: string,
    lastUsedDate: Date,
    actions: Action[]
}
