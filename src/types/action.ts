import { ValueItem } from "./value-item";

export interface Action {
    id: string,
    name: string,
    type: string;
    valueList: ValueItem[];
}
