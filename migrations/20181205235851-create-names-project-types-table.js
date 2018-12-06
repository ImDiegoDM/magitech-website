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
  return db.createTable('names-project_types',{
    names_id:{
      type:'int',
      foreignKey:{
        name:'names-project_types_names_id_fk',
        table:'names',
        mapping:{
          names_id:'id'
        },
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    project_types_id:{
      type:'int',
      foreignKey:{
        name:'names-project_types_project_types_id_fk',
        table:'project_types',
        mapping:{
          project_types_id:'id'
        },
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
  });
};

exports.down = function(db) {
  return db.dropTable('names-project_types');
};

exports._meta = {
  "version": 1
};
