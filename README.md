# Set-Up-Webpack
为加深webpack的认识，手动搭建一个webpack-vue框架,实际使用还是使用cli为主

1. 初始化webpack 

   - 创建webpack的文件夹 
   - 初始化 npm init -y  npm -d webpack webpack-cli
   - 在webpack文件里创建src文件添加main.js(随便添加点内容 console.log('first dist'))
   - 在package.json文件 scripts添加 "build": "webpack src/main.js"
   - 运行 npm run build 如果在webpack文件家里多出dist文件，则打包成功，否.往前查看步骤是否错误

2. 开始配置

   - 新建build文件，在文件里创建webpack.config.js文件

   - ```javascript
     const path=require('path')
     module.exports={
         mode:'development', //开发者模式 development 或 生产者模式 production
         entry:path.resolve(__dirname,'../src/main.js'), //入口文件
         //输出
         output:{
             filename:'[name].[hash:8].js', //打包后的名字 生成8位数的hash
             path:path.resolve(__dirname,'../dist') //打包路径
         }
     } 	
     ```

   - 修改package.json —>scripts  "build": "webpack --config build/webpack.config.js"

   - 运行 npm run build 如果在webpack文件家里多出dist文件，则打包成功，否.往前查看步骤是否错误

3. 添加插件 在index.html里自动引入main.js

   - 安装插件  npm i -D html-webpack-plugin  自动引入main.js里面内容到index.html

   - 在根目录添加public文件夹 —>index.html

   - 修改webpack.config.js 文件

   - ```javascript
     const path=require('path')
     const HtmlWebpackPlugin = require('html-webpack-plugin')   //这里引入插件
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
             })
         ]
     } 
     ```

   - 再次 npm run build 会发现 打包的dist文件里出现了index.html 和main.js文件

   - 但是由于每次打包生成hash不同，导致每次打包都会把main.js打包进dist文件夹，这时候就需要一个删除插件来把之前打包的dist文件删除

   - 安装插件 npm i -D clean-webpack-plugin

   - ```javascript
     const {CleanWebpackPlugin} = require('clean-webpack-plugin')   //引入 自动删除打包前的dist文件
     //插件注入
         plugins:[
             new HtmlWebpackPlugin({
                 template:path.resolve(__dirname,'../public/index.html')
             }),
             new CleanWebpackPlugin()
         ]
     ```

   - 一般情况下，把不需要打包的静态文件放入public文件下，这个地方的文件不会被打包进dist，所有需要插件来帮忙把文件复制过去

   - npm i -D  copy-webpack-plugin 复制文件插件

   - ```javascript
     const CopyWebpackPlugin = require('copy-webpack-plugin')      // 复制文件
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
         ]
     ```

   - loader加载css文件 

   - 在使用loader时有三种使用方式 

     - [配置](https://www.webpackjs.com/concepts/loaders/#configuration)（推荐）：在 **webpack.config.js** 文件中指定 loader。
     - [内联](https://www.webpackjs.com/concepts/loaders/#inline)：在每个 `import` 语句中显式指定 loader。
     - [CLI](https://www.webpackjs.com/concepts/loaders/#cli)：在 shell 命令中指定它们。

   - 这里使用配置 安装预编译器插件 能更好的出来css 根据情况使用sass 或 less,这里选择的是sass

   - npm install -D sass-loader node-sass

   - ```javascript
     //module.rules 允许你在 webpack 配置中指定多个 loader
     modules:{
             rules:[
                 {
                     test: /\.scss$/,
                     use: ['style-loader', 'css-loader', 'sass-loader'] // 从右向左解析原则
                 }
             ]
         }
     ```
