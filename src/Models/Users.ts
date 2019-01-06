import { DB } from 'easy-node-db';

export class Users extends DB {
  protected tableName = 'users';
  protected fields = {
    id: '',
    name: '',
    email: '',
    password: 'hidden',
  };
}
