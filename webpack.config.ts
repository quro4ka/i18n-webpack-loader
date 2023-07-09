import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

const lang = require('./i18n.json');

const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        root: './src/pages/root.tsx',
        root2: './src/pages/root2.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader', exclude: ['/node-modules/'] },
            {
                test: /\.tsx$/,
                use: {
                    loader: path.resolve(__dirname, 'loaders/i18n-loader.cjs'),
                    options: lang,
                },
            },
        ],
    },
    resolveLoader: {
        alias: {
            'i18n-loader': path.resolve(__dirname, 'loaders/i18n-loader.cjs'),
        },
    },
};

export default config;
