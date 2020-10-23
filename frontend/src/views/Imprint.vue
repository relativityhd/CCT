<template>
  <div class="imprint">
    <div class="imprint-head">
      <h1>
        {{ $t('Imprint.title') }}
      </h1>
      <div>
        <p>
          {{ $t('Imprint.article') }}
          <br />
          {{ $t('Imprint.owner') }}
          <br />
          {{ $t('Imprint.adress1') }}
          <br />
          {{ $t('Imprint.adress2') }}
          <br />
        </p>

        <h3>{{ $t('Imprint.contact') }}</h3>
        Phone: 0049 1234-789456
        <br />
        E-Mail:
        <a href="mailto:max@mustermann.de">max@mustermann.de</a>
        <br />
        {{ $t('Imprint.registered') }}
        <br />
        {{ $t('Imprint.taxId') }}
      </div>
    </div>

    <div class="liabilities">
      <div class="content-liability">
        <h2>{{ $t('Imprint.contentLiability') }}</h2>
        <p>{{ $t('Imprint.contentLiabilityText') }}</p>
      </div>
      <div class="external-links">
        <h2>{{ $t('Imprint.externalLinks') }}</h2>
        <p>{{ $t('Imprint.externalLinksText') }}</p>
      </div>
      <div class="copyright">
        <h2>{{ $t('Imprint.copyright') }}</h2>
        <p>{{ $t('Imprint.copyrightText') }}</p>
      </div>
      <div class="data-protection">
        <h2>{{ $t('Imprint.dataProtection') }}</h2>
        <p>{{ $t('Imprint.dataProtectionText') }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.imprint {
  text-align: left;
  margin: 0 50px 0 30px;
}

@media screen and (max-width: 600px) {
  .imprint {
    margin: 0 10px 0 0;
  }
}
</style>
