import { decisionTableController } from "../../rest-controller/decision-table.controller";
import { DecisionTable } from "../../types/decision-table";

const mock = jest.fn().mockImplementation(() => (
    {
      async getTableNameById(id: string): Promise<string> {
        return "Table name";
      },
      async getLastAssignedId() 
      {
        return 0;
      },
      async saveTable(table: DecisionTable){
        // empty implementation
      },
      loadTable(tableId: string): DecisionTable | null {
        const table = "{\"id\":\"5183b4cf-0b51-422c-a815-ce8409ba18f8\",\"name\":\"First\",\"note\":\"Thisisastarter\",\"email\":\"\",\"lastUsedDate\":\"2022-05-10T21:45:44.905Z\",\"actions\":[],\"conditions\":[],\"rules\":[]}"
        return JSON.parse(table);
      },
      async changeTableNameById(id: string, newName: string): Promise<string>{
        return "New table name"
      },
      async changeTableNoteById(id: string, newNote: string): Promise<string>{
        return "New table description"
      }
    }
  )
);
  
export default mock;