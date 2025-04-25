const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    entry: {
        index: './src/index.ts',
    },
    mode: 'production',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: { configFile: 'tsconfig.json' }
                },
                exclude: /node_modules|fs/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: x => x.chunk.name.replace('_', '-') + '.js',
        // library: '[name]0',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        // Prevent any optimization, as we want CommonJS output
        minimize: false,
    },
};