var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        main : "./public/js/main.jsx",
        room : "./public/js/room.jsx",
        mode : "./public/js/mode.jsx",
        planning : "./public/js/planning.jsx",
        modal : "./public/js/modal.jsx",
     },
    output: {
        path: "/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
                // test: /\.jsx?$/,
                // exclude: /(node_modules|bower_components)/,
                // loader: 'babel', // 'babel-loader' is also a legal name to reference
                // query:
                // {
                //     presets:['react']
                // }
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin("commons.js")
    ]
};