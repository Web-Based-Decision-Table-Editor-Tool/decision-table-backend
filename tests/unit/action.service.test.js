import resourceManager from '../../src/resource-manager/resource-manager';
import actionService from './../../src/service/action.service';
import decisionTableService from './../../src/service/decision-table.service';
import decisionTablePersistence from './../../src/persistence/decision-table.persistence';

import uuid4 from "uuid4"

// source: https://jestjs.io/docs/manual-mocks
// __mocks__ directory added for mock implementation
jest.mock('./../../src/persistence/decision-table.persistence');

test('Add condition', async () => {
    const rm = new resourceManager()
    const persistence = new decisionTablePersistence(rm);
    const decTableService = new decisionTableService(persistence);

    const condition = new actionService(decTableService, persistence);

    const result = condition.addAction(uuid4(), "Shipping", "boolean", ["Ship","No Ship"]);

    expect(result).not.toBe(null);
  });
