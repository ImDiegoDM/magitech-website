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
  return db.createTable('project_images-projects',{
    projects_id:{
      type:'int',
      notNull:true,
      foreignKey:{
        name:'project_images-projects_projects_id_fk',
        table:'projects',
        mapping:{
          projects_id:'id'
        },
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    image_id:{
      type:'int',
      notNull:true,
      foreignKey:{
        name:'project_images-projects_image_id_fk',
        table:'project_images',
        mapping:{
          image_id:'id'
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
  return db.dropTable('project_images-projects');
};

exports._meta = {
  "version": 1
};
