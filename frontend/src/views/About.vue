<template>
  <div class="about">
    <div class="aboutUs">
      <h2>{{ $t('About.title') }}</h2>
      <h4>{{ $t('About.aboutUs') }}</h4>
      <cv-list>
        <cv-list-item v-for="key in ['About.for0', 'About.for1', 'About.for2', 'About.for3']" :key="key">
          {{ $t(key) }}
        </cv-list-item>
      </cv-list>
    </div>
    <img class="berlinimg" src="../assets/startup.jpg" />
    <div class="ourVision">
      <h4>{{ $t('About.ourVision') }}</h4>
      {{ $t('About.ourVisionText') }}
    </div>
    <div class="usp">
      <h4>{{ $t('About.uspOpener') }}</h4>
      <cv-list>
        <cv-list-item v-for="key in ['About.usp0', 'About.usp1', 'About.usp2', 'About.usp3']" :key="key">
          {{ $t(key) }}
        </cv-list-item>
      </cv-list>
    </div>
  </div>
</template>
<style lang="scss" scoped>
h4 {
  padding-bottom: 0.2em;
}
.about {
  padding-top: 1.5rem;
  text-align: left;
  padding-bottom: 2rem;
}
.aboutUs {
  margin-left: 10vw;
  padding-bottom: 1.5rem;
}
.ourVision {
  padding-top: 1.5rem;
  margin-left: 10vw;
}
.usp {
  padding-top: 1.5rem;
  margin-left: 10vw;
}
.berlinimg {
  object-fit: cover;
  height: 40vh;
  width: 100%;
}
</style>
