module.exports = {
	output: {
		comments: false
	},
	compress: {
		warnings: false,
		conditionals: true,
		unused: true,
		comparisons: true,
		sequences: true,
		dead_code: true,
		evaluate: true,
		if_return: true,
		join_vars: true,
		negate_iife: false // because of `v8LazyParse()`
	}
}
