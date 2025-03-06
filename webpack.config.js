const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point of your app
  output: {
    path: path.resolve(__dirname, "build"), // Output folder
    filename: "bundle.js", // Output file name
    publicPath: "/",
  },
  mode: "development", // Use "production" for production builds
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Handle JS/JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve these extensions
  },
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 3000, // Same port as create-react-app
    historyApiFallback: true, // For React Router
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template HTML file
    }),
  ],
};