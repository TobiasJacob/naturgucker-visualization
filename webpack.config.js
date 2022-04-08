const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
    entry: {
        entry: './src/index.ts',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Naturgucker dataset',
        }),
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
