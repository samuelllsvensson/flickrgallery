import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const __dirname = path.resolve();

export default {
  mode: "production",
  entry: "./public/js/client.js",
  target: "es5",
  stats: "minimal",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: path.resolve(__dirname, "dist/index.html"),
      publicPath: "./js",
    }),
  ],
};
