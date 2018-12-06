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
  return db.createTable('simple_texts-projects',{
    simple_texts_id:{
      type:'int',
      notNull:true,
      foreignKey:{
        name:'simple_texts-projects_simple_texts_id_fk',
        table:'simple_texts',
        mapping:{
          simple_texts_id:'id'
        },
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    projects_id:{
      type:'int',
      notNull:true,
      foreignKey:{
        name:'simple_texts-projects_projects_id_fk',
        table:'projects',
        mapping:{
          projects_id:'id'
        },
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    }
  });
};

exports.down = function(db) {
  return db.dropTable('simple_texts-projects');
};

exports._meta = {
  "version": 1
};
