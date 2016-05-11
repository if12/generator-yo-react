'use strict';
 
const dependencyList = {
	'jquery': 'jquery',
    'React-bootstrap': 'react-bootstrap',
    'object-assign':   'object-assign'
}


const devDependencies = [
	"react",
    "react-dom",
    "react-addons-test-utils",
    "babel-loader",
    "babel-core",
    "webpack",
    "webpack-dev-server",
    "extract-text-webpack-plugin",
    "eslint",
    "eslint-config-skylar",
    "eslint-loader",
    "file-loader",
    "url-loader",
    "css-loader",
    "style-loader",
    "json-loader"
]

module.exports = {
	dependencyList,
	devDependencies
};