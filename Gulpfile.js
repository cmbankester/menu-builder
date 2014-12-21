var server_file = require('./package.json').main;
var gulp = require('gulp');
var server = require('gulp-webserver');
var logger = require('./app/lib/logger')('gulpfile')

gulp.task('server', function(){
  server.run({
    file: server_file
  });
});

gulp.task('default', ['server'], function(){
  gulp.watch(['app/**/*.js', './Gulpfile.js'], ['server']);
});
