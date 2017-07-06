module.exports = {
    entry: {
        facebook: './src/main/resources/static/js/facebook.js',
        diary: './src/main/resources/static/js/diary.js',
        form: './src/main/resources/static/js/form.js'
        ,
    },
    output: {
        path: __dirname + '/src/main/resources/static/webpack',
        filename: "[name]-bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};