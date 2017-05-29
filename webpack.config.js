var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './app/app.js')
    },
    output: {
        path: path.resolve(__dirname, './app/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            //{
            //    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //    loader: "url-loader?limit=10000&mimetype=application/font-woff"
            //},
            //{
            //    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //    loader: "file-loader"
            //},
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './app/index.html')
        }),
        CommonsChunkPlugin
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './app',
        port: 9000
    }
};