const { join } = require('path');
const webpack = require('webpack');
const V8LazyParse = require('v8-lazy-parse-webpack-plugin');
const SWPrecache = require('sw-precache-webpack-plugin');
const HTML = require('html-webpack-plugin');

const uglify = require('./uglify');
const babel = require('./babel');

const out = join(__dirname, '../dist');
const exclude = /(node_modules|bower_components)/;

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production' || process.argv.indexOf('-p') !== -1;

// base plugins array
const plugins = [
	new V8LazyParse(),
	new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)}),
	new HTML({template: 'src/index.html'})
];

if (isProd) {
	babel.presets.push('babili');
	plugins.push(
		new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
		new webpack.optimize.UglifyJsPlugin(uglify),
		new SWPrecache({
			cacheId: 'inferno-starter',
			filename: 'service-worker.js',
			dontCacheBustUrlsMatching: /./,
			staticFileGlobsIgnorePatterns: [/\.(html|map)$/]
		})
	);
}

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		path: out,
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [{
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
	devtool: !isProd && 'eval',
	devServer: {
		port: process.env.PORT || 3000,
		contentBase: out
	}
};
