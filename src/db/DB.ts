import * as moment from 'moment';
import * as mysql from 'mysql';
import connection from '../dbConection';

export interface IDbFields {
  [key: string]: string;
}

export interface IDbRelationshipObject {
  [key: string]: IDbRelationship;
}

export enum RelationshipTypes {
  hasOne = 'hasOne', 
  hasMany = 'hasMany', 
  belongsToOne = 'belongsToOne', 
  belongsToMany = 'belongsToMany', 
  manyToMnay = 'manyToMnay',
}

export interface IDbRelationship {
  type: RelationshipTypes;
  table: DB<IDbFields, IDbRelationshipObject>;
}

export interface IDbRelationshipData {
  type: RelationshipTypes;
  data: any[];
}

export interface IDbRelationshipIterator {
  [key: string]: IDbRelationshipData;
}

export interface IPage {
  actual: number;
  elements: number;
}

export class DB<T extends IDbFields, W extends IDbRelationshipObject = {}> {
  public static toArray<T>(values: T[]): any[][] {
    const arrayValues: any[][] = [];
    for (const iterator of values) {
      const arrayIterator: any[] = [];
      for (const key in iterator) {
        if (iterator.hasOwnProperty(key)) {
          const element = iterator[key];
          arrayIterator.push(element);
        }
      }
      arrayValues.push(arrayIterator);
    }

    return arrayValues;
  }

  public static mapWhereIds(condition: string, ids: string[]): string {
    let where = '';

    for (const iterator of ids) {
      where += `${condition} = ${iterator} OR `;
    }

    return where.slice(0, -4);
  }

  /**
   * Find a object on array that has a key id with the same value with
   * id param and return index of that object
   * @param array 
   * @param id 
   */
  public static findElementById(array: any[], id: string | number) {
    for (const index of array.keys()) {
      if (array[index].id === id) {
        return index;
      }
    }

    return undefined;
  }

  protected tableName: string;
  protected fields: T;
  protected relantionships: W;
  protected hasTimestamps = false;

  protected connection = connection;

  public getTableName(): string {
    return this.tableName;
  }

  public getFields(): T {
    return this.fields;
  }

  public combineRelantioshipObjects(objs: any[], childs: IDbRelationshipIterator) {
    let objsClone: any = [...objs];
    for (const key in childs) {
      if (childs.hasOwnProperty(key)) {
        const element = childs[key];
        switch (element.type) {
          case 'hasOne':
            objsClone = objsClone.map((obj: any) => {
              obj[key] = [];
              return obj;
            });

            for (const iterator of element.data) {
              if (iterator.hasOwnProperty(this.tableName + '_id')) {
                const objId = DB.findElementById(objs, parseInt(iterator[this.tableName + '_id']));
                if (objId !== undefined) {
                  objsClone[objId][key].push(iterator);
                } else {
                  console.warn('RelationshipIterator of type hasOne did not find a father element match ');
                }
              } else {
                console.warn('RelationshipIterator of type hasOne dont have property ' + this.tableName + '_id');
              }
            }
            break;
        }
      }
    }

    return objsClone;
  }

  public all(page?: IPage): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let pageQuery = '';

      if (page) {
        pageQuery = ` LIMIT ${page.actual * page.elements},${page.elements}`;
      }
      this.connection.query(
        `SELECT ${this.mapFields()} 
        FROM ${this.tableName} 
        ORDER BY ${this.tableName}.id DESC${pageQuery};`,
        async (err, result, field) => {
          if (err) { reject(err); }

          const relantionships = await this.mapRealantionships(result.map((row: any) => {
            return row.id.toString();
          }));

          result = this.combineRelantioshipObjects(result, relantionships);

          resolve(result);
        },
      );
    });
  }

  public get(id: string|number): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = this.connection.query({
        sql: `SELECT ${this.mapFields()} FROM ${this.tableName} WHERE id = ?;`,
        values: [id],
      }, 
      async (err, result, field) => {
        if (err) { reject(err); }

        const relantionships = await this.mapRealantionships(result.map((row: any) => {
          return row.id.toString();
        }));

        result = this.combineRelantioshipObjects(result, relantionships);

        resolve(result[0]);
      });
    });
  }

  public save(values: T | T[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (Array.isArray(values)) {
        const query = this.connection.query(
          `INSERT INTO ${this.tableName} (${this.mapFields(true)}) VALUES ?`,
          [DB.toArray<T>(values)],
          (err, result) => {
          if (err) { reject(err); }
  
          resolve(result);
          },
        );
      } else {
        this.connection.query(`INSERT INTO ${this.tableName} SET ?`, values, async (err, result) => {
          if (err) { reject(err); }

          resolve(result);
        });
      }

    });
  }

  public update(values: any, id: string | number): Promise<any> {
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

  private mapFields(toSave: boolean = false): string {
    let fields = toSave ? '' : `${this.tableName}.id, `;
    const joins: string[] = [];

    for (const key in this.fields) {
      const element = this.fields[key];
      if (!this.isHidden(element) || toSave) {
        fields += toSave ? `${key}, ` : `${this.tableName}.${key}, `;
      }
    }

    if (this.hasTimestamps) {
      fields += `${this.tableName}.created_at, ${this.tableName}.modified_at, `;
    }

    return fields.slice(0, -2);
  }

  private where(whereSql: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT ${this.mapFields()} FROM ${this.tableName} WHERE ${whereSql};`,
        (err, result, field) => {
          if (err) { reject(err); }

          resolve(result);
        },
      );
    });
  }

  private async mapRealantionships(ids: string[]): Promise<IDbRelationshipIterator> {
    const relantionships: IDbRelationshipIterator = {};
    for (const key in this.relantionships) {
      const element: string|IDbRelationship = this.relantionships[key];
      switch (element.type) {
        case 'hasOne':
          relantionships[key] = {
            type: RelationshipTypes.hasOne, 
            data: await this.hasOne(element.table, ids),
          };
          break;
      }
    }

    return relantionships;
  }

  private hasOne(table: DB<IDbFields, IDbRelationshipObject>, ids: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      table.where(DB.mapWhereIds(`${this.tableName}_id`, ids)).then((result) => {
        resolve(result);
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  private hasMany(table: DB<IDbFields, IDbRelationshipObject>): string {
    return `not implemented yet`;
  }

  private belongsToOne(table: DB<IDbFields, IDbRelationshipObject>): string {
    return `not implemented yet`;
  }

  private belongsToMany(table: DB<IDbFields, IDbRelationshipObject>): string {
    return `not implemented yet`;
  }

  private manyToMany(table: DB<IDbFields, IDbRelationshipObject>): string {
    return `not implemented yet`;
  }

  private mapFieldsValues(values: T, id?: string|number) {
    let fields = '';
    const valuesArray = [];

    for (const key in values) {
      fields += `${key} = ?, `;
      valuesArray.push(values[key]);
    }

    if (this.hasTimestamps) {
      fields += `modified_at = ?, `;
      valuesArray.push(moment().format('YYYY-MM-DD HH-mm-ss'));
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
