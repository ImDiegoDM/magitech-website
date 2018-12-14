import * as mysql from 'mysql';

export interface IDbFields {
  [key: string]: string;
}

export class DB<T extends IDbFields> {
  protected tableName: string;
  protected fields: T;

  protected connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password : process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });

  public all(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.query(`SELECT ${this.mapFields()} FROM ${this.tableName};`, (err, result, field) => {
        if (err) { reject(err); }

        resolve(result);
      });
    });
  }

  public get(id: string|number): Promise<T> {
    return new Promise((resolve, reject) => {
      this.query({
        sql: `SELECT ${this.mapFields()} WHERE id = ? FROM ${this.tableName};`,
        values: [id],
      }, 
      (err, result, field) => {
        if (err) { reject(err); }

        resolve(result);
      });
    });
  }

  protected query(query: string | mysql.QueryOptions, result: mysql.queryCallback) {
    this.connection.connect();

    this.connection.query(query, result);

    this.connection.end();
  }

  private mapFields(): string {
    let fields = '';

    for (const key in this.fields) {
      if (this.isHidden(this.fields[key])) {
        fields += `${key}, `;
      }
    }

    return fields.slice(0, -2);
  }

  private isHidden(field: string): boolean {
    return field.indexOf('hidden') === -1;
  }

}
