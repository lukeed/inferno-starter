const V8LazyParse = require('v8-lazy-parse-webpack-plugin');
const webpack = require('webpack');
const uglify = require('./uglify');
const babel = require('./babel');

const out = './dist';
const exclude = /(node_modules|bower_components)/;

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production' || process.argv.indexOf('-p') !== -1;

// base plugins array
const plugins = [
	new V8LazyParse(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(env)
	})
];

if (isProd) {
	babel.presets.push('babili');
	plugins.push(
		new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
		new webpack.optimize.UglifyJsPlugin(uglify)
	);
}

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		path: `${out}/assets`,
		filename: '[name].[chunkhash].js',
		publicPath: '/assets'
	},
	module: {
		rules: [{
			test: /\.html$/,
			exclude: exclude,
			loader: 'file-loader',
			query: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.jsx?$/,
			exclude: exclude,
			loader: 'babel-loader',
			options: babel
		}, {
			test: /\.s(a|c)ss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}]
	},
	plugins: plugins,
	devServer: {
		port: process.env.PORT || 3000,
		contentBase: out
	}
};
