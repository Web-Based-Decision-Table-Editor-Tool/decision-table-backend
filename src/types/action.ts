import { ActionItem } from "./action-item";

export interface Action {
    id: string,
    name: string
    items: ActionItem[]
}