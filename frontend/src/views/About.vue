<template>
  <div class="about">
    <div class="aboutUs">
      <h2>{{ $t('title')}}</h2>
      <h4>{{ $t('aboutUs') }}</h4>
      <cv-list>
        <cv-list-item v-for="key in ['for0', 'for1', 'for2', 'for3']" :key="key">{{ $t(key) }}</cv-list-item>
      </cv-list>
    </div>
    <img class=berlinimg src="../assets/startup.jpg">
    <div class="ourVision">
      <h4>{{ $t('ourVision') }}</h4>
      {{ $t('ourVisionText') }}
    </div>
    <div class="usp">
      <h4>{{$t('uspOpener')}} </h4>
      <cv-list>
        <cv-list-item v-for="key in ['usp0','usp1', 'usp2', 'usp3',]" :key="key">{{ $t(key) }}</cv-list-item>
      </cv-list>

    </div>
  </div>
</template>
<style lang="scss" scoped>
h4{
  padding-bottom: 0.2em;
}
.about{
  padding-top: 1.5rem;
  text-align: left;
  padding-bottom: 2rem;
}
.aboutUs{
  margin-left: 10vw;
  padding-bottom: 1.5rem;
}
.ourVision{
  padding-top: 1.5rem;
  margin-left: 10vw;
}
.usp{
  padding-top: 1.5rem;
  margin-left: 10vw;
}
.berlinimg{
  object-fit: cover;
  height: 40vh;
  width: 100%;
}
</style>
<i18n>
{
  "en": {
      "title": "Who we are",
      "aboutUs": "We are Cupboard Limited a StartUp from Berlin, which produces:",
      "for0":"Cupboards",
      "for1":"Sideboards",
      "for2":"Highboards",
      "for3":"Lowboards",
      "ourVision": "Our Vision",
      "ourVisionText": "A sustainable, valuable production of fully customizable cupboards",
      "uspOpener": "Our key steps:",
      "usp0": "Collaboration with local producing partners and wood suppliers",
      "usp1": "Production with 100% renewable energies until 2030",
      "usp2": "Power supply of our stores and offices with 100% renewable energies",
      "usp3": "100 % FSC certified wood"

  },
  "de": {
      "title": "Who we are",
      "aboutUs": "Wir sind Cupboard Limited ein Berliner StartUp für:",
      "for1":"Aufbauschränke",
      "for2":"Sideboards",
      "for3":"Highboards",
      "for4":"Lowboards",
      "ourVision": "Unsere Vision:",
      "ourVisionText": "Eine nachhaltige, wertschöpfende Produktion von komplett konfigurierbaren langlebigen Schränken schaffen",
      "uspOpener":"Was uns ausmacht:",
      "usp0":"Zusammenarbeit mit lokalen Produktionspartner und Holzlieferanten je Standort",
      "usp1":"Herstellung der Produkte bis 2030 komplett mit erneuerbarer Energie",
      "usp2": "Betrieb unserer Filialen und Büros zu 100% mit erneuerbarer Energie",
      "usp3":"100 Prozent FSC zertifiziertes Holz"
  }
}
</i18n>
