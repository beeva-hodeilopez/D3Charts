// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js


// Para correr los test e2e de forma correcta, hay que tener correctamente instalado protractor, webdriver y ejecutar webdriver-manager start (http://angular.github.io/protractor/#/)
// npm install -g protractor
// webdriver-manager update
// webdriver-manager start

'use strict';

exports.config = {
  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.
  allScriptsTimeout: 110000,

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:' + (process.env.PORT || '4444'),

  // list of files / patterns to load in the browser
  specs: [
    'e2e/**/*.spec.js'
  ],

//  chromeDriver: 'node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager',

  seleniumAddress: 'http://localhost:4444/wd/hub',


  // Patterns to exclude.
  exclude: [],

  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine',

  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
