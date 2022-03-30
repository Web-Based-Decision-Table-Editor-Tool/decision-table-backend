import { Settings } from "../../types/settings";

const mock = jest.fn().mockImplementation(() => (
    {
        getSettings() {
            let settings: Settings =  {
                maxTables: 1000,
                maxRules: 100,
                maxConditions: 100,
                maxActions: 100
            }
            return settings;
        }
    }
  )
);
  
export default mock;
