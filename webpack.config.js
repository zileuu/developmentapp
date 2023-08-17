const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js', 
  const path = require('path');
  
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/main.js',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	module: {
		rules: [
			{ test: /\.css/i, use: ['style-loader', 'css-loader'] },
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},

		]
	},
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		title: 'To Do List',
	// 	}),
	// ],
	// optimization: {
	// 	runtimeChunk: 'single',
	// },
}