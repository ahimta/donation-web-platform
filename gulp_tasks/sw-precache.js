const gulp = require('gulp');
const packageJson = require('../package.json');
const path = require('path');
const swPrecache = require('sw-precache');

const conf = require('../conf/gulp.conf');

const URL_PATTERN = /https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.7\/|https:\/\/i.imgur.com\/hZvwKFv.png/;

gulp.task('sw-precache', function(callback) {
  writeServiceWorkerFile(conf.paths.dist, true, callback);
});

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  const config = {
    cacheId: packageJson.name,
    /*
    dynamicUrlToDependencies: {
      'dynamic/page1': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page1.jade')
      ],
      'dynamic/page2': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page2.jade')
      ]
    },
    */
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: URL_PATTERN,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          name: 'runtime-cache'
        }
      }
    }],
    staticFileGlobs: [
      rootDir + '/*.css',
      rootDir + '/*.html',
      rootDir + '/*.js'
    ],
    stripPrefix: rootDir + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
}
