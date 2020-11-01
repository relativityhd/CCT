<template>
  <div class="about">
    <div class="aboutUs">
      <h1>{{ $t('About.title') }}</h1>
      <h6>{{ $t('About.aboutUs') }}</h6>
      <div class="for-wrapper">
        <cv-tile v-for="key in ['About.for0', 'About.for1', 'About.for2', 'About.for3']" :key="key">
          <h1>{{ $t(key) }}</h1>
        </cv-tile>
      </div>
    </div>

    <img class="berlinimg" src="../assets/startup.jpg" />
    <div class="vision-wrapper">
      <div class="ourVision">
        <h3>{{ $t('About.ourVision') }}</h3>
        <cv-structured-list>
          <template slot="items">
            <cv-structured-list-item>
              <cv-structured-list-data>
                {{ $t('About.ourVisionText') }}
              </cv-structured-list-data>
            </cv-structured-list-item>
          </template>
        </cv-structured-list>
      </div>

      <div class="usp">
        <h3>{{ $t('About.uspOpener') }}</h3>
        <cv-structured-list>
          <template slot="items">
            <cv-structured-list-item v-for="key in ['About.usp0', 'About.usp1', 'About.usp2', 'About.usp3']" :key="key">
              <cv-structured-list-data>
                {{ $t(key) }}
              </cv-structured-list-data>
            </cv-structured-list-item>
          </template>
        </cv-structured-list>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.about {
  text-align: center;
}

.for-wrapper,
.vision-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  width: 98%;
  max-width: 1200px;
  margin: 15px auto;
  gap: 20px;
}

.for-wrapper div {
  background: $interactive-01;
  color: $text-04;
}

.vision-wrapper div {
  max-width: 300px;
}

.berlinimg {
  object-fit: cover;
  height: 40vh;
  width: 100%;
}
</style>
