var server_file = require('./package.json').main;
var gulp = require('gulp');
var server = require('gulp-webserver');
var less = require('gulp-less');

var LessPluginCleanCSS = require("less-plugin-clean-css");

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var concat = require('gulp-concat');
var uglify_js = require('gulp-uglify');
var del = require('del');

var less_opts = {
  paths: [
    'app/assets/styles/includes',
    'bower_components/bootstrap/less'
  ],
  plugins: [
    new LessPluginCleanCSS({advanced: true}),
    new LessPluginAutoPrefix({browsers: ["last 2 versions"]})
  ]
};

var js_paths = [
  'app/assets/scripts/**/*.js',
  'bower_components/jquery/dist/jquery.js',
  'bower_components/bootstrap/dist/js/bootstrap.js'
];

var less_paths = [
  'app/assets/styles/app.less'
];

gulp.task('clean-js', function(cb){
  del(['public/js/**/*'], cb);
});

gulp.task('js', ['clean-js'], function(){
  return gulp
    .src(js_paths)
    .pipe(concat('all.js'))
    // .pipe(uglify_js())
    .pipe(gulp.dest('public/js'));
});

gulp.task('clean-css', function(cb){
  del(['public/css/**/*'], cb);
});

gulp.task('less', ['clean-css'], function(){
  return gulp
    .src(less_paths)
    .pipe(less(less_opts))
    .pipe(gulp.dest('public/css'));
});

gulp.task('handle-assets', ['less', 'js']);

gulp.task('prepare-server', function(){
  server.prepare();
});

gulp.task('server', function(){
  server.run({
    file: server_file
  });
});

gulp.task('default', ['handle-assets', 'prepare-server', 'server'], function(){
  gulp.watch(['app/**/*.js', '!app/assets/**/*', './Gulpfile.js'], ['server']);
  gulp.watch('app/assets/scripts/**/*', ['js']);
  gulp.watch('app/assets/styles/**/*', ['less']);
  gulp.watch('bower_components/**/*', ['handle-assets'])
});
