/* eslint-disable */
const path = require('path');
const Fiber = require('fibers');
const webpack = require('webpack');

const htmlWebpackPlugin = require("html-webpack-plugin");
const htmlBeatifyWebpackPlugin = require("html-beautify-webpack-plugin");
const DynCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

const galleryConfig = {
    mode: "development",
    entry: "./src/index.tsx",
    plugins: [
        new htmlWebpackPlugin({
            templateParameters: {
                'title': 'Webpack App'
            },
            template: './src/index.ejs'
        }),
        new htmlBeatifyWebpackPlugin(),
        new DynCdnWebpackPlugin(),
        new webpack.DefinePlugin({
        	'process.env.SERVER_URL': JSON.stringify('http://13.80.181.48/')
        })
    ],
    resolve: {
        extensions: ['.js', '.tsx', '.json']
    },
    devServer: {
    	headers: {
    		'Access-Control-Allow-Origin': '*',
    		'Access-Control-Allow-Headers': 'access-control-allow-origin'
    	}
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.(s?)css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            fiber: Fiber
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[hash].[ext]',
                },
            }
        ]
    }
}

module.exports = galleryConfig;
