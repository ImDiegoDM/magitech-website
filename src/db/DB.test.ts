import { DB, IDbFields } from './DB';

interface ITestDBFields extends IDbFields {
  name: string;
  test_id: string;
  email: string;
}

class TestDB extends DB<ITestDBFields> {
  public connection: any = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };

  protected tableName = 'test';
  protected fields = {
    name: 'hidden',
    test_id: 'hidden|pk:table',
    email: '',
  };

}

describe('DataBase base class', () => {
  let testDB: TestDB;

  beforeEach(() => {
    testDB = new TestDB();
  });

  test('should call correct query on all func', () => {
    testDB.all();
    
    expect(testDB.connection.query.mock.calls[0][0]).toBe('SELECT email FROM test;');
    expect(testDB.connection.connect).toHaveBeenCalled();
    expect(testDB.connection.end).toHaveBeenCalledWith();
  });

  test('should call correct query on all func', () => {
    testDB.get(1);
    
    expect(testDB.connection.query.mock.calls[0][0]).toEqual({
      sql: 'SELECT email WHERE id = ? FROM test;',
      values: [1],
    });
    expect(testDB.connection.connect).toHaveBeenCalled();
    expect(testDB.connection.end).toHaveBeenCalledWith();
  });
});
