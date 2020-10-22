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
  }
}
