export interface ITableResponse {
    id: string;
    status: number;
}

export interface ITableNameResponse {
    name: string;
    status: number;
}

export interface ITableNoteResponse {
    note: string;
    status: number;
}

export interface ErrorResponse {
    msg: string;
    status: number;
}

export interface IConditionResponse {
    msg: string;
    status: number;
}
