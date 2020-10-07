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
        @import './src/assets/scss/palette.scss';
        $carbon--theme: $carbon--theme--what;
        @include carbon--theme();
        ${
          process.env.NODE_ENV === 'production'
            ? "@import '~carbon-components/scss/globals/scss/styles.scss';"
            : "@import '~carbon-components/css/carbon-components.css';"
        }`
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('optimize-css')
  }
}
