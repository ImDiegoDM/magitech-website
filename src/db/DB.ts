import * as mysql from 'mysql';
import connection from '../dbConection';

export interface IDbFields {
  [key: string]: string;
}

export class DB<T extends IDbFields> {
  protected tableName: string;
  protected fields: T;

  protected connection = connection;

  public all(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT ${this.mapFields()} FROM ${this.tableName};`, (err, result, field) => {
        if (err) { reject(err); }

        resolve(result);
      });
    });
  }

  public get(id: string|number): Promise<T> {
    return new Promise((resolve, reject) => {
      const query = this.connection.query({
        sql: `SELECT ${this.mapFields()} FROM ${this.tableName} WHERE id = ?;`,
        values: [id],
      }, 
      (err, result, field) => {
        if (err) { reject(err); }

        resolve(result[0]);
      });
    });
  }

  public save(values: T | T[]): Promise<T> {
    return new Promise((resolve, reject) => {
      if (Array.isArray(values)) {
        const query = this.connection.query(
          `INSERT INTO ${this.tableName} (${this.mapFields(true)}) VALUES ?`,
          [this.toArray(values)],
          (err, result) => {
          if (err) { reject(err); }
  
          resolve(result);
          },
        );
      } else {
        this.connection.query(`INSERT INTO ${this.tableName} SET ?`, values, (err, result) => {
          if (err) { reject(err); }
  
          resolve(result);
        });
      }

    });
  }

  public update(values: any, id: string | number): Promise<T> {
    return new Promise((resolve, reject) => {
      const [fields, valuesArray] = this.mapFieldsValues(values, id);
      this.connection.query({
        sql: `UPDATE ${this.tableName} SET ${fields} WHERE id = ?;`,
        values: valuesArray,
      }, 
      (err, result, field) => {
        if (err) { reject(err); }

        resolve(result);
      });
    });
  }

  private toArray(values: T[]): string[][] {
    const arrayValues = [];
    for (const iterator of values) {
      const arrayIterator = [];
      for (const key in iterator) {
        if (iterator.hasOwnProperty(key)) {
          arrayIterator.push(iterator[key]);
        }
      }
      arrayValues.push(arrayIterator);
    }

    return arrayValues;
  }

  private mapFields(all: boolean = false): string {
    let fields = '';

    for (const key in this.fields) {
      if (!this.isHidden(this.fields[key]) || all) {
        fields += `${key}, `;
      }
    }

    return fields.slice(0, -2);
  }

  private mapFieldsValues(values: T, id?: string|number) {
    let fields = '';
    const valuesArray = [];

    for (const key in values) {
      fields += `${key} = ?, `;
      valuesArray.push(values[key]);
    }

    if (id) {
      valuesArray.push(id);
    }

    return [fields.slice(0, -2), valuesArray];
  }

  private isHidden(field: string): boolean {
    return field.indexOf('hidden') !== -1;
  }

}
