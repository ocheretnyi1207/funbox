const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/js/main.js",
  output: {
    path: path.join(__dirname, "./build/js/"),
    filename: "bundle.js"
  },
  devtool: "source-map"
};
