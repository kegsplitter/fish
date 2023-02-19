const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./fish/entry/EntryWindOrgan.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'WindOrganBundle.js'
    },
    plugins: [new HtmlWebpackPlugin()]
}