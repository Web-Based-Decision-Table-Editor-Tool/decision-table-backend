export interface Rule {
    id: string,
    conditions: RuleItem[],
    actions: RuleItem[]
}

export interface RuleItem {
    ruleItemid: string,
    //itemid represents the id of condition/action
    itemid: string,
    //represents id of valueitem in the condition/action
    valueid: string
}

export interface RuleApiInput {
    id: string,
    valueid: string
}