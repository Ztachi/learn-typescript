const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require("glob");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entry = glob.sync("./ts/**/*.ts");


console.log(entry);
module.exports = {
    entry,
    mode: 'development',
    output: {
        path: path.join(__dirname, 'js'),
        filename: '[name][hash].js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        contentBase: './',
        compress: true,
        port: 9000,
        index: 'index.html',
        open: true,
        inline: true,
        hot: true,
        overlay: true
    }
};