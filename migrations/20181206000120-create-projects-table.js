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
  return db.createTable('projects',{
    id:{type:'int',primaryKey:true},
    types_id:{
      type:'int',
      foreignKey:{
        name:'projects_types_id_fk',
        table:'project_types',
        mapping:{
          types_id:'id'
        },
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    name:{type:'string',length:50},
    googl_play_link:'string',
    steam_link:'string',
    apple_link:'string',
    url_link:'string',
    play_link:'string',
  });
};

exports.down = function(db) {
  return db.dropTable('projects');
};

exports._meta = {
  "version": 1
};
