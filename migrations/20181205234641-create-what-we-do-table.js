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
  return db.createTable('what_we_do',{
    id:{type:'int',primaryKey:true},
    img_url:{type:'string',notNull:true}
  });
};

exports.down = function(db) {
  return db.dropTable('what_we_do');
};

exports._meta = {
  "version": 1
};
