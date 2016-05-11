/*
* @Author: RoyChen
* @Date:   2016-03-22 16:10:42
* @Last Modified by:   RoyChen
* @Last Modified time: 2016-05-11 18:10:03
*/
'use strict';

let webpack            = require('webpack');
let UglifyJsPlugin     = webpack.optimize.UglifyJsPlugin; 
let commonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let ExtractTextPlugin  = require('extract-text-webpack-plugin');
let path               = require('path');
let nodeModulesPath    = path.resolve(process.cwd(), 'node_modules');

const isDebug = process.env.WEBPACK_DEV;
module.exports = {
	devtool: isDebug ? 'source-map' : 'eval',
	addVendors:function(alias_name, mPath){
		this.resolve.alias[alias_name] = mPath;
		this.module.noParse.push(new RegExp(mPath));
	},
	entry: {
        demo: [
                'webpack-dev-server/client?http://localhost:<%= port%>/', 
                'webpack/hot/dev-server',
                 './example/demo.js'
              ],
        libs: ['react', 'react-dom']
    },
	output:  {
		path:     		path.resolve( isDebug ? 'build' : 'public' ),
		filename: 		isDebug ? '[name].js' : 'js/[hash:8].[name].min.js',
        publicPath:     isDebug ? '/build/' : '/public/'
        // 
        // library:        '<%= name.firstUpperCase()%>',
        // libraryTarget:  'umd',
        // umdNamedDefine: true
        // 
	},
	resolve: {
        root: [nodeModulesPath],
        alias: {}
    },
    module:{
        preLoaders: [
            <% preLoaders.map(function(preloader, i){%>
                    {
                        extensions: '<%= preloader.extensions%>',
                        test:       <%= preloader.test%>,
                        loader:     '<%= preloader.loader%>',
                        exclude:    /node_modules/
                    }<%if (i < loaders.length - 1){%>,<%}%>
            <%})%>
        ],
    	loaders: [
            <% loaders.map(function(loader, i){%>
        			{
        				extensions: '<%= loader.extensions%>',
        				test:   	<%= loader.test%>,
        				loader: 	'<%= loader.loader%>',
                        exclude:    /node_modules/
        			}<%if (i < loaders.length - 1){%>,<%}%>
        	<%})%>
        ]

    },
    eslint: {
        failOnWarning: false,
        failOnError:   true,
        fix:           true
    },
    plugins:[
        new commonsChunkPlugin({
             name:'libs',
             filename:"libs.js"
            }),
    ]
};

