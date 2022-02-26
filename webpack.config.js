console.log('webpack.config.js import start');
import path from 'path'
import webpack from 'webpack'
import HtmlWebPackPlugin from "html-webpack-plugin"
console.log('webpack.config.js import end');
const __dirname = path.resolve();


const generateHtmlPlugin = (title) => {
    return new HtmlWebPackPlugin({
        title,
        filename: `${title}.html`,
        template: `./src/pages/${title}.html`,
    });
}

const populateHtmlPlugins = (pagesArray) => {
    var res = [];
    pagesArray.forEach(page => {
        res.push(generateHtmlPlugin(page));
    })
    return res;
}

// const pages = populateHtmlPlugins(["index"]);

export default {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'foo.bundle.js',
    },
    target: 'web',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins 
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    }
                ]
            },
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve('./tsconfig.json'),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'index',
            filename: `index.html`,
            template: `./index.html`,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery"
        })
    ]
    , experiments: {
        asyncWebAssembly: true,
        // WebAssembly as async module (Proposal)
        syncWebAssembly: true,
        // WebAssembly as sync module (deprecated)
        outputModule: true,
        // Allow to output ESM
        topLevelAwait: true,
        // Allow to use await on module evaluation (Proposal)
    }
};