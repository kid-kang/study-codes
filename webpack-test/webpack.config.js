//使用 npx webpack --watch  指令可实时更新打包文件
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin") //自动生成引入bundle的html文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //将CSS文件抽离成一个单独的文件的插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') //生产模式下css代码压缩


module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',                   //生成打包好的文件名
    path: path.resolve(__dirname, './dist'), //输出文件夹必须定义为绝对路径
    clean: true,                             //清理dist没用的文件
  },

  mode: 'development',      //开发模式
  // mode: 'production',          //生产模式

  plugins: [   //插件配置
    new HtmlWebpackPlugin({       // 实例化 html-webpack-plugin 插件
        template: './index.html', // 继承的模板文件
        filename: 'app.html',     // 打包生成的文件名称。默认为index.html
        inject: 'body'            // 设置所有资源文件注入模板的标签位置。
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'  //css单独打包到一个文件夹中
    })
  ],

  devtool: 'inline-source-map',  //准确地知道错误来自于哪个源文件

  module: { //模块配置
    rules: [  //loader + 资源文件规则
      { //加载图片和字体
        test: /\.(jpg|png|svg|woff|woff2|eot|ttf|otf)/,
        type: 'asset' ,   //导出文件资源或data URI
        generator: {  //设置该类型文件的放置路径和命名
          filename: 'images/[contenthash][ext][query]'
        },
        parser: {
            dataUrlCondition: { //配置按文件大小导出文件或data URI
            maxSize: 4 * 1024 // 4k
          }
        }   
      },
      {
        test: /\.(scss|sass|less)$/i,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], //用到的loader  逆序执行
      },
    ]
  },

  // 优化配置
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),//生产模式下css代码压缩
    ],
  }
    
  
}