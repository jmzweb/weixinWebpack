/**
 * Created by sloong on 2016/6/14.
 */
'use strict';

var gulp = require('gulp');
var webpack = require('webpack');

//用于gulp传递参数
var minimist = require('minimist');

var gutil = require('gulp-util');

var src = process.cwd() + '/src';
var assets = process.cwd() + '/dist';

var knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'production'}
};

var options = minimist(process.argv.slice(2), knownOptions);

var webpackConf = require('./webpack.config');
var webpackConfDev = require('./webpack.config');

var remoteServer = {
    host: '10.142.86.216',
    remotePath: '/teemo_a/',
    user: 'ftpuser',
    pass: 'ftpuser'
};
var localServer = {
    host: '10.142.86.216',
    remotePath: '/teemo_a/',
    user: 'ftpuser',
    pass: 'ftpuser'
}

//check code
gulp.task('hint', function () {
    var jshint = require('gulp-jshint')
    var stylish = require('jshint-stylish')

    return gulp.src([
        '!' + src + '/js/lib/**/*.js',
        src + '/js/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
})

// clean asserts
gulp.task('clean', ['hint'], function () {
    var clean = require('gulp-clean');
    return gulp.src(assets, {read: true}).pipe(clean())
});

//run webpack pack
gulp.task('pack', ['clean'], function (done) {
    var _conf = options.env === 'production' ? webpackConf : webpackConfDev;
    webpack(_conf, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err)
        gutil.log('[webpack]', stats.toString({colors: true}))
        done()
    });
});

//default task
gulp.task('default', ['pack'])

//deploy assets to remote server
gulp.task('deploy', function () {
    var sftp = require('gulp-sftp');
    var _conf = options.env === 'production' ? remoteServer : localServer;
    return gulp.src(assets + '/**')
        .pipe(sftp(_conf))
})