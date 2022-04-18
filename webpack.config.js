const path = require('path');

module.exports = {
    entry: {
        'bundle': './js/frontend/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'src/public/dist'),
        filename: '[name].js'
    },
    mode: 'production',
};