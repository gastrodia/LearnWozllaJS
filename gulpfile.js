var gulp = require('gulp');
var fs = require('fs');
var fse = require('fs-extra');
var glob = require('glob');
var path = require('path');
var ts = require('gulp-typescript');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var merge = require('merge2');
var md5 = require('MD5');
var through = require('through2');

var distPath = 'dist';
var paths = {
    tsFiles: [
        'Engine/core/**/*.ts',
        'Engine/cocos2d/**/*.ts',
        'Engine/framework/**/*.ts',
        'src/**/*.ts'
    ],
    jsFiles: [
        'Engine/hammer.js',
        'libs/navmesh.js',
        'libs/CanvasTextWrapper.js',
        'game.js'
    ]
};

var tsProject = ts.createProject({
    declarationFiles: false,
    target: 'ES5',
    out: 'game.js',
    typescript: require('typescript'),
    experimentalDecorators: true,
    noEmitOnError: true
});

function removeDev() {
    return through.obj(function(file, enc, cb) {
        if(file.isNull()) {
            return cb(null, file);
        }
        var regex = /\/\/\/.*?<dev>[\s\S]*?\/\/\/.*?<\/dev>/ig;
        file.contents = new Buffer(file.contents.toString().replace(regex, ''));
        cb(null, file);
    });
}

gulp.task('compileTs', function() {
    return gulp.src(paths.tsFiles)
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest('.'))
        .pipe(removeDev())
        .pipe(gulp.dest(distPath));
});

gulp.task('combineJs', ['compileTs'], function() {
    return gulp.src(paths.jsFiles)
        .pipe(concat('game_all.js'))
        .pipe(gulp.dest('.'))
});

gulp.task('removeDist', function(cb) {
    fse.removeSync(distPath);
    fse.ensureDir(distPath);
    cb();
});

gulp.task('copy', ['removeDist'], function() {
    return gulp.src(paths.copies, { base: '.' })
        .pipe(gulp.dest(distPath));
});

gulp.task('copyRes', function() {
    return gulp.src(paths.resCopies, { base: '.' })
      .pipe(rename(function(path) {
          path.dirname = path.dirname.replace('tsv2_res/' , '');
          return path;
      }))
      .pipe(gulp.dest(distPath));
});

gulp.task('watch', ['compileTs', 'combineJs'], function() {
    gulp.watch('src/**/*.ts', ['compileTs', 'combineJs']);
});
