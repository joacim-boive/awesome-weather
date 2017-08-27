/* eslint no-console:"off" */
const {resolve} = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const OfflinePlugin = require('offline-plugin/runtime').install();

module.exports = (env) => {
    const {ifProd, ifNotProd} = getIfUtils(env);
    const config = {
        context: resolve('src'),
        entry: './js/index/index.js',
        output: {
            filename: 'bundle.[name].[hash].js',
            path: resolve('dist'),
            pathinfo: ifNotProd()
        },
        devtool: ifProd('source-map', 'eval'),
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
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader'
                    }
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
                }
            ]
        },
        plugins: removeEmpty([
            new ProgressBarPlugin(),
            new ExtractTextPlugin('styles.[name].[hash].css'),
            ifProd(new InlineManifestWebpackPlugin()),
            // ifProd(new webpack.optimize.CommonsChunkPlugin({
            //     names: ['manifest']
            // })),
            new HtmlWebpackPlugin({
                template: './index.html'
                // inject: 'head'
            }),
            // new OfflinePlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: ifProd('"production"', '"development"')
                }
            }),
            new UglifyJSPlugin({
                    parallel: {
                        cache: true
                    },
                    sourceMap: true
                }
            ),
            new BundleAnalyzerPlugin()
        ])
    };
    if (env.debug) {
        console.log(config);
        debugger // eslint-disable-line
    }
    return config;
};
