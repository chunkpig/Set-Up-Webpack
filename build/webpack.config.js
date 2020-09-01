const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')   //这里引入插件 自动引入main.js里面内容到index.html
const {CleanWebpackPlugin} = require('clean-webpack-plugin')   //引入 自动删除打包前的dist文件
const CopyWebpackPlugin = require('copy-webpack-plugin')      // 复制文件
module.exports={
    mode:'development', //开发者模式 development 或 生产者模式 production
    entry:path.resolve(__dirname,'../src/main.js'), //入口文件
    //输出
    output:{
        filename:'[name].[hash:8].js', //打包后的名字 生成8位数的hash
        path:path.resolve(__dirname,'../dist') //打包路径
    },
    //插件注入
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist')
                }
            ]
        })
    ],
    modules:{
        rules:[
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'] // 从右向左解析原则
            }
        ]
    }
} 