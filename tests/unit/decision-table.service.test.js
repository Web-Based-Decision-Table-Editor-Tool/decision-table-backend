import decisionTableService from './../../src/service/decision-table.service';
import decisionTablePersistence from './../../src/persistence/decision-table.persistence';

// source: https://jestjs.io/docs/manual-mocks
// __mocks__ directory added for mock implementation
jest.mock('./../../src/persistence/decision-table.persistence');

test('add table', async () => {
    const persistence = new decisionTablePersistence();
    const service = new decisionTableService(persistence);

    const name = 'Table name';
    const description = 'Table description';

    const result = await service.addTable(name, description)
    
    expect(result.status).toBe(201);
  });
