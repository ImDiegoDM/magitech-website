const { watch,series,parallel,task,src,dest } = require('gulp');
const { exec } = require('child_process');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function build(cb) {
  exec('npm run build:dev',(error,stdout,stderr)=>{
    console.log(`bulding ts`);

    if(error){
      console.log(`error: ${error}`);
      cb();
    }

    console.log(`stdout: ${stdout}`);
    cb();
  });
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
  watch('src/*.ts',{interval: 1000, usePolling: true}, build);
}

function defaultFunc(cb){
  series(build,runServer,watchTsfiles)
  cb()
}

function css(cb) {
  console.log('ts changed')
  cb();
}
exports.build = build;
exports.default = series(build,parallel(runServer,watchTsfiles));