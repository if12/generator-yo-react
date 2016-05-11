'use strict';


module.exports = (function(){
	const cssLoader = ['style-loader', "css-loader?minimize"];
	const loaders   = {
		"jsx":                  "babel-loader",
		"js":                   "babel-loader",
		"json":                 "json-loader",
		"coffee":               "coffee-redux-loader",
		"json5":                "json5-loader",
		"txt":                  "raw-loader",
		"png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
		"woff|woff2":           "url-loader?limit=100000",
		"ttf|eot":              "file-loader",
		"wav|mp3":              "file-loader",
		"html":                 "html-loader",
		"md|markdown":          ["html-loader", "markdown-loader"],
		"css":                  cssLoader,
		"less":                 [...cssLoader, "less-loader"],
		"styl":                 [...cssLoader, "stylus-loader"],
		"scss|sass":            [...cssLoader, "sass-loader"]
	};

	const preLoaders = {
		'js': 'eslint-loader',
		'jsx': 'eslint-loader'
	};

	function extsToRegExp(exts) {
		return new RegExp('\\.(' + exts.replace(/\./g, "\\.") + ')(\\?.*)?$');
	}

	function loadersByExtension(loaders) {
		let l = [];
		Object.keys(loaders).map(function(key) {
			var exts  = key.split("|");
			var value = loaders[key];
			var entry = {
				extensions: exts,
				test: extsToRegExp(key)
			};
			if(Array.isArray(value)) {
				entry.loader = value.join('!');
			} else if(typeof value === "string") {
				entry.loader = value;
			}
			l.push(entry);
		});
		return l;
	};



	return {
		loaders:    loadersByExtension(loaders),
		preLoaders: loadersByExtension(preLoaders)
	}
}())
