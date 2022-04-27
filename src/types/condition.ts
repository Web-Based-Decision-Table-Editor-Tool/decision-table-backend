import { ValueItem } from "./value-item";

export interface Condition {
    id: string,
    name: string,
    type: string;
    valueList: ValueItem[];
}
