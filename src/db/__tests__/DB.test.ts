import { DB, IDbFields, IDbRelationship, RelationshipTypes } from '../DB';

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
    test_id: 'hidden|fk:table',
    email: '',
  };
}

// tslint:disable-next-line:max-classes-per-file
class TestQuery2 extends DB<ITestQueryFields> {
  public connection: any = {
    query: jest.fn(),
  };

  public readonly tableName = 'test';
  protected fields = {
    name: 'hidden',
    test_id: 'hidden|pk:table',
    email: '',
  };
  protected hasTimestamps = true;
}

describe('Testing if is generating the correct querys', () => {
  let testDB: TestQuery;
  let testDB2: TestQuery2;

  beforeEach(() => {
    testDB = new TestQuery();
    testDB2 = new TestQuery2();
  });

  test('should combine object correctly', () => {
    const combined = testDB.combineRelantioshipObjects([
      {email: 'diego@matias.com.br', id: 1},
      {email: 'diego@matias.com.br', id: 2},
      {email: 'diego@matias.com.br', id: 3},
    ], {
      phone: {
        type: RelationshipTypes.hasOne,
        data: [
          {number: '123456', test_id: 3},
          {number: '123456', test_id: 1},
        ],
      },
      city: {
        type: RelationshipTypes.hasOne,
        data: [
          {name: 'mg', test_id: 2},
          {name: 'sp', test_id: 3},
        ],
      },
    });

    expect(combined).toEqual([
      {email: 'diego@matias.com.br', id: 1, city: [], phone: [{number: '123456', test_id: 1}]},
      {email: 'diego@matias.com.br', id: 2, city: [{name: 'mg', test_id: 2}], phone: []},
      {email: 'diego@matias.com.br', id: 3, city: [{name: 'sp', test_id: 3}], phone: [{number: '123456', test_id: 3}]},
    ]);
  });

  test('should map object to array correctly', () =>{
    const array = DB.toArray<any>([
      {
        number: '124654131',
        users_id: 2,
      },
      {
        number: '32132654',
        users_id: 2,
      },
      {
        number: '65654',
        users_id: 22,
      },
    ]);

    expect(array).toEqual([
      ['124654131', 2],
      ['32132654', 2],
      ['65654', 22],
    ]);
  });

  test('should call correct query on all func', () => {
    testDB.all();
    
    expect(testDB.connection.query.mock.calls[0][0]).toBe(
      `SELECT test.id, test.email 
        FROM test 
        ORDER BY test.id DESC;`,
    );
  });

  test('should call correct query on all func with pagination', () => {
    testDB.all({actual: 1, elements: 10});
    
    expect(testDB.connection.query.mock.calls[0][0]).toBe(
      `SELECT test.id, test.email 
        FROM test 
        ORDER BY test.id DESC LIMIT 10,10;`,
    );
  });

  test('should call correct query on all func with timestamps', () => {
    testDB2.all();
    
    expect(testDB2.connection.query.mock.calls[0][0]).toEqual(
      `SELECT test.id, test.email, test.created_at, test.modified_at 
        FROM test 
        ORDER BY test.id DESC;`,
    );
  });

  test('should call correct query on all func with timestamps and pagination', () => {
    testDB2.all({actual: 3, elements: 20});
    
    expect(testDB2.connection.query.mock.calls[0][0]).toEqual(
      `SELECT test.id, test.email, test.created_at, test.modified_at 
        FROM test 
        ORDER BY test.id DESC LIMIT 60,20;`,
    );
  });

  test('should call correct query on get func', () => {
    testDB.get(1);
    
    expect(testDB.connection.query.mock.calls[0][0]).toEqual({
      sql: 'SELECT test.id, test.email FROM test WHERE id = ?;',
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

  test('should map multiple wheres correctly', () => {
    const where = DB.mapWhereIds('test', ['1', '2', '3']);

    expect(where).toEqual('test = 1 OR test = 2 OR test = 3');
  });

  test('should call correct query on update func', () => {
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

  test('should call correct query on update func with timestamps', () => {
    testDB2.update({
      name: 'diego',
      test_id: '2',
      email: 'contato@diegomatias.com.br',
    }, 1);

    const answr = testDB2.connection.query.mock.calls[0][0];
    
    expect(answr.sql).
    toEqual('UPDATE test SET name = ?, test_id = ?, email = ?, modified_at = ? WHERE id = ?;');
    expect(answr.values[0]).toEqual('diego');
    expect(answr.values[1]).toEqual('2');
    expect(answr.values[2]).toEqual('contato@diegomatias.com.br');
    expect(answr.values[4]).toEqual(1);
  });
});
