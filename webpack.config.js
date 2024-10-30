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
        library: '[name]',
        path: path.resolve(__dirname, 'dist'),
    }
};