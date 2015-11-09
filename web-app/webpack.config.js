module.exports = {
    entry: "./public/js/main.js",
    output: {
        path: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.js files
                test: /\.js$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    }
};