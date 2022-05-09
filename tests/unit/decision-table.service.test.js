import resourceManager from '../../src/resource-manager/resource-manager';
import decisionTableService from './../../src/service/decision-table.service';
import decisionTablePersistence from './../../src/persistence/decision-table.persistence';

// source: https://jestjs.io/docs/manual-mocks
// __mocks__ directory added for mock implementation
jest.mock('./../../src/persistence/decision-table.persistence');

test('Add table', async () => {
    const rm = new resourceManager()
    const persistence = new decisionTablePersistence(rm);
    const service = new decisionTableService(persistence);

    const name = 'Table name';
    const description = 'Table description';

    const result = await service.addTable(name, description)
    
    expect(result.status).toBe(201);
  });

  test('Get table name by ID', async () => {
    const rm = new resourceManager()
    const persistence = new decisionTablePersistence(rm);
    const service = new decisionTableService(persistence);

    const name = 'Table name';
    const description = 'Table description';

    const result = await service.addTable(name, description)

    const nameByGetName = await service.getTableNameById(result.id)

    expect(nameByGetName.name).toBe(name);
  });

  test('Change table name', async () => {
    const rm = new resourceManager()
    const persistence = new decisionTablePersistence(rm);
    const service = new decisionTableService(persistence);

    const name = 'Table name';
    const description = 'Table description';

    const result = await service.addTable(name, description)

    const newName = 'New table name';
    const newResult = await service.changeTableName(result.id, newName)

    expect(newResult.name).toBe(newName);
  });

  test('Change table note', async () => {
    const rm = new resourceManager()
    const persistence = new decisionTablePersistence(rm);
    const service = new decisionTableService(persistence);

    const name = 'Table name';
    const description = 'Table description';

    const result = await service.addTable(name, description)

    const newNote = 'New table description';
    const newResult = await service.changeTableNote(result.id, newNote)

    expect(newResult.note).toBe(newNote);
  });
