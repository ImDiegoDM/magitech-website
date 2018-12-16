import conection from '../../dbConection';
import { DB, IDbFields, IDbRelationship, RelationshipTypes, IDbRelationshipObject } from '../DB';

interface IUserFields extends IDbFields {
  name: string;
  email: string;
}

interface IUserRelantions extends IDbRelationshipObject {
  phones: IDbRelationship;
}

class Users extends DB<IUserFields, IUserRelantions> {
  protected tableName = 'users';
  protected fields = {
    name: '',
    email: '',
  };

  protected relantionships = {
    phones: {
      type: RelationshipTypes.hasOne,
      table: new Phones(),
    },
  };
}

interface IPhoneFields extends IDbFields {
  number: string;
  users_id: string;
}

// tslint:disable-next-line:max-classes-per-file
class Phones extends DB<IPhoneFields> {
  protected tableName = 'phones';
  protected fields = {
    number: '',
    users_id: '',
  };
}

describe('Relantionship has one test', () => {
  const users = new Users();
  const phones = new Phones();
  
  beforeAll(() => {
    return new Promise((res, rej) => {
      conection.query(`CREATE TABLE users(
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
      conection.query(`CREATE TABLE phones(
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        number VARCHAR(30) NOT NULL,
        users_id INT(6) UNSIGNED NOT NULL
      )`, (err) => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  });

  test('should return users and his relantionships', async () => {
    const result = await users.save({
      name: 'diego',
      email: 'contato@diegomatias.com.br',
    });

    const id = result.insertId;

    await phones.save([
      {
        number: '124654131',
        users_id: id,
      },
      {
        number: '32132654',
        users_id: id,
      },
      {
        number: '65654',
        users_id: id + 10,
      },
    ]);

    const user = await users.get(id);

    expect(user).toHaveProperty('phones');
    expect(user.phones).toHaveLength(2);
  });

  afterEach( () => {
    return new Promise((res, rej) => {
      conection.query(`DELETE FROM phones;`, (err) => {
        if (err) {
          rej(err);
        }
        conection.query(`DELETE FROM phones;`, (errP) => {
          if (errP) {
            rej(errP);
          }
          res();
        });
      });
    });
  });
  
  afterAll(() => {
    return new Promise((res, rej) => {
      conection.query(`DROP TABLE users, phones`, (err) => {
        if (err) {
          rej(err);
        }
        conection.end();
        res();
      });
    });
  });
});
