/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const FILE_NAME = 'index';

let outputFile;
let devtool = '';

if (env === 'build') {
    outputFile = FILE_NAME + '.min.js';
    devtool = 'source-map';
} else {
    outputFile = FILE_NAME + '.js';
    devtool = 'eval-source-map';
    devtool = 'eval';
}

const config = {
    entry: path.resolve(__dirname, 'src') + '/' + FILE_NAME + '.js',
    devtool: devtool,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile,
        library: FILE_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
                // loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff',
                query: {
                    name: 'static/media/files/[name].[hash:8].[ext]'
                }
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                query: {
                    name: 'static/media/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(gif|jpe?g|png)$/,
                loader: 'url-loader?limit=25000',
                query: {
                    limit: 10000,
                    name: 'static/media/images/[name].[hash:8].[ext]'
                }
            },
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')],
        extensions: ['.json', '.js']
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html'
            // inject: 'head'
        })
    ]
};

module.exports = config;
