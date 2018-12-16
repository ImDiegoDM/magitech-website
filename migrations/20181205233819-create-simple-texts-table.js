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
  return db.createTable('simple_texts',{
    id:{type:'int',primaryKey:true},
    text:{type:'text',notNull:true},
    created_at:{ 
      type:'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    modified_at:{
      type:'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    lang_id:{
      type:'string',
      length:10,
      notNull:true,
      foreignKey:{
        name:'simple_texts_lang_id_fk',
        table:'languages',
        mapping:{
          lang_id:'id'
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
  return db.dropTable('simple_texts');
};

exports._meta = {
  "version": 1
};
