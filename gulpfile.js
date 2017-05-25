'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync').create();


const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const notifier = require('node-notifier');
const gulplog = require('gulplog');
const path = require('path');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);

        return task(callback);
    });
}

lazyRequireTask('assets', './tasks/assets', {
    src: 'src/index.html',
    dst: 'public'
});

lazyRequireTask('styles:styl', './tasks/styles-styl', {
   src: 'src/styles/styl/styl.styl',
    dst: 'src/styles/css'
});

lazyRequireTask('styles:less', './tasks/styles-less', {
    src: 'src/styles/less/less.less',
    dst: 'src/styles/css'
});

lazyRequireTask('styles', './tasks/styles', {
    src: 'src/styles/main.css',
    dst: 'public/css'
});

gulp.task('webpack', function(callback) {

    let options = {
        entry: './src/js/main',

        output:  {
            path:     __dirname + '/public/js',
            publicPath: '/js/',
            filename: 'build.js'
        },
        watch:   true,
        module:  {
            loaders: [{
                test:    /\.js$/,
                include: path.join(__dirname, "frontend"),
                loader:  'babel?presets[]=es2015'
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin() // otherwise error still gives a file
        ]
    };

    // https://webpack.github.io/docs/node.js-api.html
    webpack(options, function(err, stats) {
        if (!err) { // no hard error
            // try to get a soft error from stats
            err = stats.toJson().errors[0];
        }

        if (err) {
            notifier.notify({
                title: 'Webpack',
                message: err
            });

            gulplog.error(err);
        } else {
            gulplog.info(stats.toString({
                colors: true
            }));
        }

        // task never errs in watch mode, it waits and recompiles
        if (!options.watch && err) {
            callback(err);
        } else {
            callback();
        }

    });


});

lazyRequireTask('images', './tasks/images', {
    src: 'src/**/*.{svg,png,jpeg,jpg}',
    dst: 'public/img'
});

lazyRequireTask('clean', './tasks/clean', {
    src: 'public'
});

gulp.task('build', gulp.series('clean',
    gulp.parallel('assets', 'styles:styl', 'styles:less', 'webpack', 'images'),
    'styles')
);

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', gulp.series('assets'));
    gulp.watch('src/styles/**/*.styl', gulp.series('styles:styl'));
    gulp.watch('src/styles/**/*.less', gulp.series('styles:less'));
    gulp.watch('src/styles/**/*.css', gulp.series('styles'));
    gulp.watch('src/**/*.{svg,png,jpeg,jpg}', gulp.series('images')).on('unlink', function(filepath) {
        remember.forget('images', path.resolve(filepath));
        delete cached.caches.images[path.resolve(filepath)];
    });;
});

gulp.task('serve', function() {
    browserSync.init({
        server: 'public'
    });

    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);