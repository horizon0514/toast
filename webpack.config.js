const path = require('path');

module.exports = () => (
    {
        mode: 'production',
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './lib'),
            filename: 'toast.js',
            libraryTarget: 'umd',
            globalObject: 'this',
            // libraryExport: 'default',
            library: 'Toast'
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                }
            ]
        },
    }
);