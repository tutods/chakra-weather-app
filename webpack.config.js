const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
	return {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
			publicPath: '/'
		},
		mode: 'development',
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.(scss|sass)$/,
					use: ['style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
					type: 'asset/resource'
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
					type: 'asset/inline'
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.jsx'],
			plugins: [new TsconfigPathsPlugin()]
		},
		plugins: [
			new Dotenv({
				expand: true,
				defaults: false,
				systemvars: true,
				allowEmptyValues: false
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, './public/index.html')
			}),
			new CleanWebpackPlugin()
		],
		devServer: {
			historyApiFallback: true,
			port: 3000,
			open: false,
			compress: true,
			hot: true,
			static: path.join(__dirname, 'public')
		}
	};
};
