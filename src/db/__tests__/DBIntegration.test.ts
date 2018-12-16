import conection from '../../dbConection';
import { DB, IDbFields } from '../DB';

interface ITestDBFields extends IDbFields {
  name: string;
  email: string;
}

class TestDB extends DB<ITestDBFields> {
  protected tableName = 'test';
  protected fields = {
    name: 'hidden',
    email: '',
  };

  protected connection = conection;
}

describe('Database Test', () => {
  const testDB = new TestDB();
  
  beforeAll(() => {
    return new Promise((res, rej) => {
      conection.query(`CREATE TABLE test(
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(50)
      )`, (err) => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  });

  beforeAll(() => {
    return new Promise((res, rej) => {
      conection.query(`CREATE TABLE test_child(
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        test_id INT(6) UNSIGNED NOT NULL
      )`, (err) => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  });

  

  test('should table test exist', (done) => {
    conection.query(`
      SELECT count(*)
      FROM information_schema.TABLES
      WHERE (TABLE_SCHEMA = 'db_test') AND (TABLE_NAME = 'test')
    `, (err, resul) => {
      expect(resul).toHaveLength(1);
      done();
    });
  });

  test('should save on database', async () => {
    const user = await testDB.save({
      name: 'Diego',
      email: 'contato@diegomatias.com.br',
    });
    await expect(user.insertId).toExistsInTable('test');
  });

  test('should return correctly all rows of table', async () => {
    await testDB.save([
      {
        name: 'Diego',
        email: 'contato@diegomatias.com.br',
      },
      {
        name: 'Diego 2',
        email: 'email@diegomatias.com.br',
      },
    ]);
    const result = await testDB.all();
    console.log(result);
    expect(result).toHaveLength(2);
  });

  test('should return correctly a single object from table', async () => {
    const result = await testDB.save({
      name: 'Diego',
      email: 'contato@diegomatias.com.br',
    });

    expect(await testDB.get(result.insertId)).toMatchObject({email: 'contato@diegomatias.com.br'});
  });

  test('should update correctly object from table', async () => {
    const result = await testDB.save({
      name: 'Diego',
      email: 'contato@diegomatias.com.br',
    });

    await testDB.update({email: 'email@diegomatias.com.br'}, result.insertId);

    expect(await testDB.get(result.insertId)).toMatchObject({email: 'email@diegomatias.com.br'});
  });

  afterEach( () => {
    conection.query('TRUNCATE TABLE test;');
  });
  
  afterAll(() => {
    return new Promise((res, rej) => {
      conection.query(`DROP TABLE test, test_child`, (err) => {
        if (err) {
          rej(err);
        }
        conection.end();
        res();
      });
    });
  });
});
