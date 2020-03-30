const path = require('path');

const config = {
    devtool: 'source-map',

    devServer: {
        open: true,
        port: 9000,
    },

    entry: [
        './src/main.ts',
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/',
    },
    resolve: {
        extensions: [
            '.js', '.ts', '.tsx',
        ],
    },
};

module.exports = config;
