const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
})

module.exports = {
    entry: ['./src/offline-generator.js','./src/style.scss'],
    output: {
        path: path.join(__dirname, 'zen-offline-wallet-generator/'),
        filename: 'main.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        extractSass,
    ],
    module: {
        loaders: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    }
}
