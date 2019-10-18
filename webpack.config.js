const path = require("path");

module.exports = () => {
    return {
        entry: {
            index: path.join(__dirname, "src/index.js")
        },
        output: {
            filename: "[name].js",
            path: path.join(__dirname, "dist")
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                }
            ]
        },
    };
};

