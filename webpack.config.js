module.exports = {
    entry: './src/server.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    mode: process.env.NODE_ENV || 'development'
}