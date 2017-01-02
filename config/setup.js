const webpack = require('webpack');
const V8LazyParse = require('v8-lazy-parse-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const SWPrecache = require('sw-precache-webpack-plugin');
const HTML = require('html-webpack-plugin');

const uglify = require('./uglify');

const env = process.env.NODE_ENV || 'development';
const isProd = (env === 'production');

// base plugins array
const plugins = [
	new V8LazyParse(),
	new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)}),
	new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
	new HTML({template: 'src/index.html'})
];

if (isProd) {
	plugins.push(
		new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
		new webpack.optimize.UglifyJsPlugin(uglify),
		new ExtractText('styles.[hash].css'),
		new SWPrecache({
			cacheId: 'inferno-starter',
			filename: 'service-worker.js',
			dontCacheBustUrlsMatching: /./,
			staticFileGlobsIgnorePatterns: [/\.(html|map)$/]
		})
	);
} else {
	// dev only
	plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);
}

exports.env = env;
exports.isProd = isProd;
exports.plugins = plugins;
