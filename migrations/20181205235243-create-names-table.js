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
  return db.createTable('names',{
    id:{type:'int',primaryKey:true},
    name:{type:'string',length:25,notNull:true},
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
      notNull:true,
      length:10,
      foreignKey:{
        name:'names_lang_id_fk',
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
  return db.dropTable('names');
};

exports._meta = {
  "version": 1
};
