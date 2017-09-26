module.exports = {
  components: "src/**/*.{ts,tsx}",
  propsParser: require("react-docgen-typescript").parse,
  webpackConfig: require("react-scripts-ts/config/webpack.config.dev.js")
};
