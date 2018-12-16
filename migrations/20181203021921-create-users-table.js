'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users',{
    id:{type:'int',primaryKey: true},
    name:{type:'string',length:50},
    email:'string',
    password:'string',
    created_at:{ 
      type:'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    modified_at:{
      type:'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  })
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
