module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: "./lib/",
    publicPath: "/lib",
    filename: "pquery.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps',
};
