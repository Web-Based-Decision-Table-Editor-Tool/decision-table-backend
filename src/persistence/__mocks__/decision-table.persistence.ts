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
      }
    }
  )
);
  
export default mock;
