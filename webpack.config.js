const dotenv = require('dotenv');

/**
 * 環境設定
 * .envが共通ファイル、.env.localが個人用ファイル
 */
const env = Object.assign({},
    dotenv.config({ path: '.env' }).parsed || {},
    dotenv.config({ path: '.env.local' }).parsed || {});

/**
 * ビルド環境
 */
env.NODE_ENV = (env.NODE_ENV === 'production')
    ? env.NODE_ENV
    : process.env.NODE_ENV;
console.log('NODE_ENV:', env.NODE_ENV);

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

/**
 * Path / File
 */
const contextPath = path.resolve(__dirname, './');
const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

/**
 * 製品環境判定
 */
const isProduct = env.NODE_ENV == 'production';

/**
 * Webpack Config
 */
module.exports = {
    target: 'web',
    mode: env.NODE_ENV,

    context: contextPath,
    entry: {
        main: path.resolve(srcPath, 'main.ts'),
    },
    externals: [ nodeExternals() ],

    output: {
        path: distPath,
        filename: '[name].bundle.js',
        publicPath: './',
    },

    resolve: {
        extensions: [ '.js', '.ts', '.json', '.vue' ],
        alias: {
            '@': path.resolve(srcPath),
            'vue$': 'vue/dist/vue.esm.js',
        },
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { appendTsSuffixTo: [ /\.vue$/ ] }
                    },
                    'tslint-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader',
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
            },
            {
                test: /(\.styl$)|(\.stylus$)/,
                loader: 'css-loader!stylus-loader',
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${env.NODE_ENV}"`,
            },
        }),
        new VueLoaderPlugin()
    ],

    devtool: isProduct? false: '#source-map',
};
