import { DecisionTable } from "../../types/decision-table";

const mock = jest.fn().mockImplementation(() => (
    {
      async getLastAssignedId() 
      {
        return 0;
      },
      async saveTable(table: DecisionTable){
        
      }
    }
  )
);
  
export default mock;
