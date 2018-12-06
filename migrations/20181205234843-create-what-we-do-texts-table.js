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
  return db.createTable('what_we_do-texts',{
    wwd_id:{
      type:'int',
      foreignKey:{
        name:'what_we_do-texts_wwd_id_fk',
        table:'what_we_do',
        mapping:{
          wwd_id:'id'
        },
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    texts_id:{
      type:'int',
      foreignKey:{
        name:'what_we_do-texts_texts_id_fk',
        table:'texts',
        mapping:{
          texts_id:'id'
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
  return db.dropTable('what_we_do-texts');
};

exports._meta = {
  "version": 1
};
