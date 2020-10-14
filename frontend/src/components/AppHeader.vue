<template>
  <cv-header id="app-header" aria-label="Carbon header">
    <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
    <cv-skip-to-content to="#main-content">
      {{ $t('skipto') }}
    </cv-skip-to-content>
    <cv-header-name to="/" prefix="CL">
      <img class="logo" src="@/assets/images/logo.svg" alt="Logo" />
      Shop
    </cv-header-name>

    <cv-header-nav aria-label="Carbon nav">
      <cv-header-menu-item
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :active="link.active"
      >
        {{ link.name }}
      </cv-header-menu-item>
    </cv-header-nav>

    <div class="actions">
      <cv-header-global-action
        aria-label="Shopping Cart"
        aria-controls="shopping-cart-panel"
      >
        <ShoppingCart20 />
      </cv-header-global-action>
      <cv-header-global-action
        aria-label="Locations"
        aria-controls="location-panel"
      >
        <Earth20 />
      </cv-header-global-action>
      <cv-header-global-action
        aria-label="Languages"
        aria-controls="language-panel"
      >
        <Translate20 />
      </cv-header-global-action>
    </div>

    <template v-slot:left-panels>
      <cv-side-nav id="side-nav" fixed>
        <cv-side-nav-items>
          <cv-side-nav-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            :active="link.active"
          >
            {{ link.name }}
          </cv-side-nav-link>
        </cv-side-nav-items>
      </cv-side-nav>
    </template>

    <template v-slot:right-panels>
      <cv-header-panel id="language-panel">
        <cv-switcher>
          <cv-switcher-item v-for="lang in languages" :key="lang.isoCode">
            <cv-switcher-item-link
              @click="switchLanguage(lang.isoCode)"
              href="javascript:void(0)"
              :selected="lang.selected"
            >
              {{ lang.name }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>

      <cv-header-panel id="location-panel">
        <cv-switcher>
          <cv-switcher-item v-for="loc in locations" :key="loc.isoCode">
            <cv-switcher-item-link
              @click="switchLocation(loc.isoCode)"
              href="javascript:void(0)"
              :selected="loc.selected"
            >
              {{ loc.name }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>

      <cv-header-panel id="shopping-cart-panel">
        <BasketPanel />
      </cv-header-panel>
    </template>
  </cv-header>
</template>

<script>
import Earth20 from '@carbon/icons-vue/es/earth/20'
import Translate20 from '@carbon/icons-vue/es/translate/20'
import ShoppingCart20 from '@carbon/icons-vue/es/shopping--cart/20'
import BasketPanel from './BasketPanel'

export default {
  name: 'AppHeader',
  components: { Earth20, Translate20, ShoppingCart20, BasketPanel },
  data() {
    let links = [
      { name: this.$i18n.t('region'), to: '/' },
      { name: this.$i18n.t('tool'), to: '/tool' },
      { name: this.$i18n.t('about'), to: '/about' },
      { name: this.$i18n.t('catalogue'), to: '/categories' }
    ]
    links.forEach(link => {
      link.active = link.to === this.$router.currentRoute.fullPath
    })
    return {
      links,
      languages: this.$store.state.locals.languages,
      locations: this.$store.state.locals.locations
    }
  },
  mounted() {
    this.$router.afterEach(to => {
      this.switchPage(to)
    })
  },
  methods: {
    switchLanguage(lang) {
      this.$store.commit('setLang', lang)
    },
    switchLocation(loc) {
      this.$store.commit('setLocation', loc)
    },
    switchPage(to) {
      this.links.forEach(link => {
        link.active = link.to === to.fullPath
      })
    }
  }
}
</script>

<style lang="scss">
.logo {
  height: 24px;
}

#app-header {
  background-color: $interactive-01;
}

.actions {
  display: flex;
  flex: 1 1;
  justify-content: flex-end;
  height: 100%;
}

.bx--header__action:hover,
.bx--header__menu-item:hover {
  background-color: $hover-primary !important;
}

.bx--header__action:active,
.bx--header__menu-item:active,
a.bx--side-nav__link[aria-current='page']::before,
a.bx--side-nav__link--current::before {
  background-color: $active-primary !important;
}

a.bx--header__menu-item[aria-current='page']::after,
.bx--header__menu-item--current::after {
  border-bottom-color: $active-primary;
}
.bx--switcher__item-link--selected,
.bx--switcher__item-link:hover {
  background-color: $interactive-03 !important;
}
.bx--header-panel {
  background-color: $interactive-02;
  overflow-y: auto;
}

.bx--switcher__item-link--selected {
  background-color: $active-primary;
}

.bx--switcher__item-link:hover:not(.bx--switcher__item-link--selected) {
  background-color: $hover-primary;
}
</style>

<i18n>
{
  "en": {
    "skipto": "Skip to main content.",
    "region": "Set Region",
    "tool": "Tool",
    "about": "About",
    "catalogue": "Catalogue"
  }
}
</i18n>
