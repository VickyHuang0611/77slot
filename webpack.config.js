const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 入口文件
  entry: ["./src/js/index.js", "./src/css/style.css"],
  // 输出文件
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  // 控制資源大小
  performance: {
    // 用于指定当资源大小超过限制时，Webpack 应该输出警告还是错误信息
    hints: false,
  },
  plugins: [
    // 用于清理打包目录，以保证每次打包前的目录结构干净整洁
    new CleanWebpackPlugin(),
    // 用于自动生成 HTML 文件，并自动注入打包后的 CSS 和 JS 文件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // 用于抽离 CSS 文件，以便于在页面加载时并行请求多个 CSS 文件，提高加载性能
    new MiniCssExtractPlugin({
      filename: "main.[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
