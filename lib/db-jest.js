const mysql = require('mysql');

require('dotenv').config({ path: './.test.env' });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT),
  password : process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

afterAll(()=>{
  connection.end();
})

function asyncQuery(query) {
  return new Promise((res, rej) => {
    connection.query(query, (err, result) => {
      if (err) {
        rej(err);
      }

      res(result);
    });
  });
}

expect.extend({

  async toExistsInTable(received, table, column='id') {
    let result;

    try{
      result = await asyncQuery(`SELECT * FROM ${table} WHERE ${column} = ${received}`);
    } catch(e){
      return {
        message: () =>
          `An error ocurred: ${e}`,
        pass: false,
      };
    }

    if (result.length >= 1) {
      return {
        message: () =>
          `expected column ${column} of value ${received} not to exists in ${table}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected column ${column} of value ${received} to exists in ${table}`,
        pass: false,
      };
    }

  },

});