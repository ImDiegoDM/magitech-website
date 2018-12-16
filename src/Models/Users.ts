import { DB, IDbFields } from '../db/DB';

interface IUserField extends IDbFields {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class Users extends DB<IUserField> {
  protected tableName = 'users';
  protected fields = {
    id: '',
    name: '',
    email: '',
    password: 'hidden',
  };
}
