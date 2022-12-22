const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  },
  pluginOptions: {
    svgSprite: {
        
        dir: 'src/assets/svg',
        
        test: /\.(svg)(\?.*)?$/,
        
        loaderOptions: {
            extract: true, // or false if you need the sprite to be automatically injected in the document.body
            spriteFilename: 'img/icons.[hash:8].svg',
            esModule: true
        },
        pluginOptions: {
            plainSprite: true
        }    
    }    
}    
})
