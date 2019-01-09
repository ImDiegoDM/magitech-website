const { watch,series,parallel,task,src,dest } = require('gulp');
const { exec } = require('child_process');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const ncp = require('ncp').ncp;
ncp.limit = 16;
const ts = require('gulp-typescript');
const fs = require('fs');

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
 
function build() {
  return src(['src/**/*.ts','src/**/*.tsx'])
    .pipe(ts({
      outFile: 'index.js',
      isolatedModules: true,
      noImplicitAny: true,
      sourceMap: true,
      module: "commonjs",
      target: "es6",
      jsx: "preserve",
    }))
    .pipe(dest('./dist'));
}

function runServer(cb) {
  exec('npm run nodemon ./dist/index',(error,stdout,stderr)=>{
    console.log(`starting nodemon server`);

    if(error){
      console.log(`error: ${error}`);
    }

    console.log(`stdout: ${stdout}`);
  });
}

function watchTsfiles(cb) {
  console.log('watching ts files')
  watch(['src/**/*.ts','src/**/*.tsx'],{usePolling: true}, build);
}

function movePublic(){
  return new Promise((resolve,reject)=>{
    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist');
    }

    ncp('./public', './dist/public', function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
     });
  });
}

async function buildSass() {
  await movePublic();

  return src('./src/**/*.less')
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(dest('./dist/public'));
}

function watchLessfiles(cb) {
  watch('src/**/*.less',{usePolling: true}, buildSass);
}

exports.build = build;
exports.watchTsfiles = watchTsfiles;
exports.sass = buildSass;
exports.default = series(parallel(build,buildSass),parallel(runServer,watchTsfiles,watchLessfiles));