let webpack = require("webpack");
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
    let mode_env = argv.mode || 'development';

    return {
        mode: mode_env,
        devtool: 'source-map',
        entry: {
            main: './lib/index'
        },

        output: {
            filename: mode_env === "production" ? "redux-dynamic-modules-thunk.min.js" : "redux-dynamic-modules-thunk.js",
            path: __dirname + "/dist/"
        },

        externals: {
            "react": "react",
            "redux": "redux",
            "react-redux": "react-redux",
            "redux-thunk": "redux-thunk",
            "redux-dynamic-modules": "redux-dynamic-modules"
        },
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: `react-redux-module.stats.html`,
                openAnalyzer: false
            }),
            new webpack.DefinePlugin({
                __DEV__: mode_env === "development",
                __RELEASE__: mode_env === "production"
            })
        ]
    };
};