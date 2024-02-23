const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

module.exports = function (webpackEnv) {
  const lessModuleRegex = /\.module\.less$/;
  const isProduction = process.env.NODE_ENV === "production";
  return {
    webpack: {
      // 配置别名
      alias: {
        "@": path.resolve(__dirname, "src")
      },
      // 移除cdn外部资源不打包
      externals: {
        // echarts: "echarts"
      },
      configure: (webpackConfig, { env, paths }) => {
        if (isProduction) {
          // 输出output
          webpackConfig.output = {
            ...webpackConfig.output,
            publicPath: "./" // 打包资源引入路径--目前使用的是相对路径
            // path: path.resolve(__dirname, "dist"), // 打包结果输出目录
          };
          /* ===================================== 优化项 ===================================== */
          // 去除map文件
          webpackConfig.devtool = false;
          // 拆包
          webpackConfig.optimization = {
            splitChunks: {
              chunks: "async",
              minSize: 40000, // bite
              maxAsyncRequests: 10, // 最大异步请求数
              maxInitialRequests: 10, // 页面初始化最大异步请求数
              automaticNameDelimiter: "~", // 解决命名冲突
              name: false,
              cacheGroups: {
                antd: {
                  name: "chunk-antd",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
                  priority: -7
                },
                common: {
                  name: "chunk-common",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-redux|react-router-dom|redux)[\\/]/,
                  priority: -9
                },
                // index.jsx没有引入的话是没有打包的
                axios: {
                  name: "chunk-axios",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](axios|axios)[\\/]/,
                  priority: -10
                }
              }
            }
          };
          // 压缩文件 gz
          webpackConfig.plugins.push(
            new CompressionWebpackPlugin({
              filename: "[path][base].gz",
              algorithm: "gzip",
              test: /\.js$|\.json$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
              threshold: 10240, // 只有大小大于该值(单位kb)的资源会被处理
              minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
              // deleteOriginalAssets: true // 删除原文件
            })
          );
        }

        // 打包分析插件，需要分析时打开注释
        // webpackConfig.plugins.push(new BundleAnalyzerPlugin());
        console.warn(env + "-url=" + process.env.REACT_APP_URL);

        return webpackConfig;
      }
    },
    devServer: {
      port: 3000,
      hot: true,
      client: {
        overlay: false
      },
      // 配置代理
      proxy: {
        "/": {
          target: "http://xxx.com",
          changeOrigin: true,
          pathRewrite: {
            "^/": ""
          }
        }
      }
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          // less loader option
          lessLoaderOptions: {
            lessOptions: {
              /*
                如果项目中有使用TDesign或AntDesign v4版本组件库需要自定义主题，可以在modifyVars中添加对应less变量
                antd v5版本使用css-in-js方式去定制主题，已经没有less变量了
            */
              modifyVars: {
                "@primary-color": "#2378ff"
              },
              javascriptEnabled: true
            }
          },
          modifyLessRule(lessRule) {
            lessRule.exclude = lessModuleRegex;
            return lessRule;
          },
          modifyLessModuleRule(lessModuleRule) {
            // configure the file suffix
            lessModuleRule.test = lessModuleRegex;

            // configure the generated local ident name
            const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
            cssLoader.options.modules = {
              /* 
                注意这里的命名规则：
                - CRA脚手架创建的项目是可以直接使用css modules的，css文件的命名规则默认是[local]_[hash:base64:5]
                - 这里使用css modules的命名规则
            */

              localIdentName: "[local]_[hash:base64:5]"
            };

            return lessModuleRule;
          }
        }
      }
    ],
    bable: {
      plugins: [
        // 生产环境只留console.error\warn,去除console.log
        [
          "babel-plugin-transform-remove-console",
          { exclude: isProduction ? ["error", "warn"] : ["error", "warn", "log"] }
        ]
      ]
    }
  };
};

/**
 * 1.开发环境
 * 1.1 配置别名
 * 1.2 配置代理
 * 1.3 配置less，支持模块化、全局引入less文件
 * 2.生产环境
 * 2.1 修改打包输出结果
 * 2.2 关闭 sourceMap
 * 2.3 分包优化
 * 2.4 压缩文件gz
 * 2.5 打包结果分析
 * 2.6 删除console调试信息
 */
