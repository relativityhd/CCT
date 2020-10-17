import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (!matched || matched.length <= 1) return
    const subMatched = key.match(/([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\./i)
    if (subMatched && subMatched.length > 1) {
      const sub = subMatched[1]
      const locale = subMatched[2]
      if (!messages[locale]) messages[locale] = {}
      messages[locale][sub] = locales(key)
    } else {
      const locale = matched[1]
      if (messages[locale]) messages[locale] = { ...messages[locale], ...locales(key) }
      else messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
