module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import '~@carbon/themes/scss/themes.scss';
        @import './src/assets/styles/palette.scss';
        $carbon--theme: $carbon--theme--what;
        @include carbon--theme();`
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('optimize-css')
  },
  pwa: {
    name: 'Cupboard Limited CCT',
    themeColor: '#012840',
    msTileColor: '#012840',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#012840',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    }
  }
}
