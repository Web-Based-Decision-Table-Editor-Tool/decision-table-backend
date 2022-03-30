import { DecisionTable } from "../../types/decision-table";

const mock = jest.fn().mockImplementation(() => (
    {
      async getLastAssignedId() 
      {
        return 0;
      },
      async saveTable(table: DecisionTable){
        // empty implementation
      },
      async getTotalTableCount() {
        return 1;
      },
      async getMaxTables(){
        return 1000;
      }
    }
  )
);
  
export default mock;
