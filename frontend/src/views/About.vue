<template>
  <div class="about">
    <h1>{{ $t('about') }}</h1>
    <p>{{ $t('message') }}</p>
    <Cuppy/>
  </div>
</template>
<script>
  import Cuppy from './Cuppy'
export default {
  components: {
    Cuppy
  }
}
</script>
<i18n>
{
  "en": {
    "about": "This is an about page!"
  },
  "de": {
    "about": "Dies ist eine Übersichtsseite!"
  }
}
</i18n>
