Package.describe({
  name: 'reduxdj:react-meteor-cjsx',
  version: '0.0.1',
  summary: 'Supports React on Meteor Platform, with CJSX conversion support on the fly.',
  git: 'https://github.com/reduxdj/react-meteor-cjsx.git',
  documentation: 'README.md'
});

var reactVersion = "0.13.0";

Npm.depends({
  "react": reactVersion,
});

Package.registerBuildPlugin({
  name: "compileCJSX",
  use: [],
  sources: [
    "plugin/compile-cjsx.js"
  ],
  npmDependencies: {
    "react-tools": reactVersion,
    "coffee-script": "1.9.3",
    "coffee-react-transform" : "3.2.0"
  }
});



Package.onUse(function(api) {
  api.use('meteorhacks:npm');
  api.use("templating@1.1.1");
  api.versionsFrom('1.1.0.2');
  api.addFiles([
    // On the client, we use un-minified React, and let Meteor minify it
    // when building for production. Note that the resulting file will not
    // be quite as small as the more aggressively minified version shipped
    // by Facebook, but we currently have no good way of including
    // different versions of files in development and production.
    "vendor/react-with-addons-" + reactVersion + ".js",
    "src/client-react.js"
  ], "client");

  api.addFiles([
    // On the server, we use the modules that ship with react.
    "src/require-react.js"
  ], "server");

  api.export("React");

  // Meteor-enabled components should include the ReactMeteor mixin via
  // React.createClass({ mixins: [ReactMeteor.Mixin], ... }) or just
  // ReactMeteor.createClass({ ... }).
  api.addFiles("src/ReactMeteor.js", ["server", "client"]);
  api.export("ReactMeteor", ["server", "client"]);
});

Package.onTest(function(api) {
  api.use('meteorhacks@1.0.3')
  api.use('tinytest');
  api.use('reduxdj:react-meteor-cjsx');
  api.addFiles('react-meteor-cjsx-tests.js');
});
