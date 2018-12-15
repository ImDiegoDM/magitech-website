import * as mysql from 'mysql';

const mysqlConection =  mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT),
  password : process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

export default mysqlConection;
