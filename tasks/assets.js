'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {
    return function () {
        return combiner(
            gulp.src(options.src)
                .pipe($.include())
                .pipe(gulp.dest(options.dst))
        ).on('error', $.notify.onError());
    };
};