import { Action } from "./action"
import { Condition } from "./condition"

export interface Rule {
    id: string,
    conditions: RuleItem[],
    actions: RuleItem[]
}


export interface RuleItem {
    itemid: string,
    item: Condition | Action,
    //represents id of valueitem in the condition/action
    valueid: string
}

export interface RuleApiInput {
    id: string,
    valueid: string
}