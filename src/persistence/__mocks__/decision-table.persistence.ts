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