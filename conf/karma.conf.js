const conf = require('./gulp.conf');

module.exports = function (config) {
  const configuration = {
    basePath: '../',
    singleRun: true,
    autoWatch: false,
    logLevel: 'INFO',
    junitReporter: {
      outputDir: 'test-reports'
    },
    browsers: [
      'PhantomJS'
    ],
    frameworks: [
      'jasmine',
      'jspm',
      'es6-shim'
    ],
    jspm: {
      loadFiles: [
        conf.path.src('app/**/*.tsx')
      ],
      config: 'jspm.config.js',
      browser: 'jspm.test.js'
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim'),
      require('karma-jspm'),
      require('karma-es6-shim')
    ]
  };

  config.set(configuration);
};
