import { DB, IDbFields } from './DB';

interface ITestQueryFields extends IDbFields {
  name: string;
  test_id: string;
  email: string;
}

class TestQuery extends DB<ITestQueryFields> {
  public connection: any = {
    query: jest.fn(),
  };

  protected tableName = 'test';
  protected fields = {
    name: 'hidden',
    test_id: 'hidden|pk:table',
    email: '',
  };

}

describe('Testing if is generating the correct querys', () => {
  let testDB: TestQuery;

  beforeEach(() => {
    testDB = new TestQuery();
  });

  test('should call correct query on all func', () => {
    testDB.all();
    
    expect(testDB.connection.query.mock.calls[0][0]).toBe('SELECT email FROM test;');
  });

  test('should call correct query on get func', () => {
    testDB.get(1);
    
    expect(testDB.connection.query.mock.calls[0][0]).toEqual({
      sql: 'SELECT email FROM test WHERE id = ?;',
      values: [1],
    });
  });

  test('should call correct query on save func', () => {
    testDB.save({
      name: 'diego',
      test_id: '2',
      email: 'contato@diegomatias.com.br',
    });
    
    expect(testDB.connection.query.mock.calls[0][0]).toBe('INSERT INTO test SET ?');
    expect(testDB.connection.query.mock.calls[0][1]).toEqual({
      name: 'diego',
      test_id: '2',
      email: 'contato@diegomatias.com.br',
    });
  });

  test('should call correct query on save func with multiple values', () => {
    testDB.save([
      {
        name: 'diego',
        test_id: '2',
        email: 'contato@diegomatias.com.br',
      },
      {
        name: 'matias',
        test_id: '2',
        email: 'email@diegomatias.com.br',
      },
    ]);
    
    expect(testDB.connection.query.mock.calls[0][0]).toEqual('INSERT INTO test (name, test_id, email) VALUES ?');
    expect(testDB.connection.query.mock.calls[0][1]).toEqual([[
      ['diego', '2', 'contato@diegomatias.com.br'],
      ['matias', '2', 'email@diegomatias.com.br'],
    ]]);
  });

  test('should call correct query on save func', () => {
    testDB.update({
      name: 'diego',
      test_id: '2',
      email: 'contato@diegomatias.com.br',
    }, 1);
    
    expect(testDB.connection.query.mock.calls[0][0]).toEqual({
      sql: 'UPDATE test SET name = ?, test_id = ?, email = ? WHERE id = ?;',
      values: ['diego', '2', 'contato@diegomatias.com.br', 1],
    });
  });
});
