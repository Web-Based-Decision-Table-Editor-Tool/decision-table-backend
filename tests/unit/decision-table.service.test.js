import decisionTableService from './../../src/service/decision-table.service';
import decisionTablePersistence from './../../src/persistence/decision-table.persistence';
import settingsService from '../../src/service/settings.service';
import settingsPersistence from '../../src/persistence/settings.persistence';

// source: https://jestjs.io/docs/manual-mocks
// __mocks__ directory added for mock implementation
jest.mock('./../../src/persistence/decision-table.persistence');
jest.mock('./../../src/persistence/settings.persistence');

test('add table', async () => {
  const settings_persistence = new settingsPersistence();
  const settings_service = new settingsService(settings_persistence);

  const persistence = new decisionTablePersistence();
  const service = new decisionTableService(persistence, settings_service);

  const name = 'Table name';
  const description = 'Table description';

  const result = await service.addTable(name, description)
  
  expect(result.id).toBe("dt_1");
  expect(result.status).toBe(201);
});
