<script setup lang="ts">
import { companyCapabilities, companyStats, l, labels } from '~/data/site'

const { pick } = useSiteLocale()

const pageLabels = {
  profile: l('公司介绍', 'Company Profile'),
  about: l('关于壹原理', 'About YiYuanLi'),
  heroTitle: l('立足中国，服务全球', 'Based in China, Serving Global Products'),
  heroText: l(
    '壹原理科技总部位于杭州，并在深圳、上海设立研发中心，面向全球智能硬件与物联网领域提供射频技术、嵌入式解决方案及全周期技术支持。',
    'YiYuanLi is headquartered in Hangzhou with R&D centers in Shenzhen and Shanghai, providing RF technology, embedded solutions and full-cycle support for smart hardware and IoT products.',
  ),
  cooperation: l('联系合作', 'Contact Us'),
  overview: l('公司概览', 'Company Overview'),
  capabilities: l('核心能力', 'Core Capabilities'),
  network: l('研发网络', 'R&D Network'),
  networkText: l(
    '以射频技术与嵌入式解决方案为技术定位，为产品从方案定义到落地提供协同支持。',
    'With RF technology and embedded solutions at its core, YiYuanLi supports products from definition through delivery.',
  ),
  partners: l('合作伙伴', 'Partners'),
  brandAlt: l('壹原理品牌', 'YiYuanLi brand'),
  brandText: l('射频技术与嵌入式解决方案', 'RF technology and embedded solutions'),
}

const offices = [
  { type: l('总部', 'Headquarters'), city: l('杭州', 'Hangzhou'), text: l('壹原理科技总部所在地。', 'YiYuanLi headquarters.') },
  { type: l('研发中心', 'R&D Center'), city: l('深圳', 'Shenzhen'), text: l('壹原理科技研发中心所在地。', 'YiYuanLi R&D center.') },
  { type: l('研发中心', 'R&D Center'), city: l('上海', 'Shanghai'), text: l('壹原理科技研发中心所在地。', 'YiYuanLi R&D center.') },
]

const partners = Array.from({ length: 9 }, (_, index) => `/assets/partners/partner-${String(index + 1).padStart(2, '0')}.png`)
</script>

<template>
  <main class="company">
    <nav class="company-breadcrumb" aria-label="breadcrumb">
      <NuxtLink to="/">{{ pick(labels.home) }}</NuxtLink>
      <span aria-hidden="true">&rsaquo;</span>
      <strong>{{ pick(pageLabels.profile) }}</strong>
    </nav>

    <section class="company-hero">
      <div class="company-hero__copy">
        <div>
          <p>{{ pick(pageLabels.about) }}</p>
          <h1>{{ pick(pageLabels.heroTitle) }}</h1>
          <p>{{ pick(pageLabels.heroText) }}</p>
          <NuxtLink to="/#contact">{{ pick(pageLabels.cooperation) }}</NuxtLink>
        </div>
      </div>

      <div class="company-hero__brand" :aria-label="pick(pageLabels.brandAlt)">
        <img src="/assets/company-logo-wide.png" :alt="pick(pageLabels.brandAlt)" />
        <p>{{ pick(pageLabels.brandText) }}</p>
      </div>
    </section>

    <section id="overview" class="company-section company-section--overview">
      <header class="company-section__title">
        <span>01</span>
        <h2>{{ pick(pageLabels.overview) }}</h2>
      </header>
      <dl class="company-stats">
        <div v-for="stat in companyStats" :key="stat.value">
          <dt>{{ stat.value }}</dt>
          <dd>{{ pick(stat.label) }}</dd>
        </div>
      </dl>
    </section>

    <section id="capability" class="company-section company-section--muted">
      <header class="company-section__title">
        <span>02</span>
        <h2>{{ pick(pageLabels.capabilities) }}</h2>
      </header>
      <div class="company-capabilities">
        <article v-for="(item, index) in companyCapabilities" :key="pick(item)">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ pick(item) }}</h3>
        </article>
      </div>
    </section>

    <section id="network" class="company-section">
      <header class="company-section__title">
        <span>03</span>
        <h2>{{ pick(pageLabels.network) }}</h2>
      </header>
      <p class="company-section__intro">{{ pick(pageLabels.networkText) }}</p>
      <div class="company-offices">
        <article v-for="office in offices" :key="office.city.zh">
          <p>{{ pick(office.type) }}</p>
          <h3>{{ pick(office.city) }}</h3>
          <span>{{ pick(office.text) }}</span>
        </article>
      </div>
    </section>

    <section id="partners" class="company-section company-section--partners">
      <header class="company-section__title">
        <span>04</span>
        <h2>{{ pick(pageLabels.partners) }}</h2>
      </header>
      <div class="company-partners">
        <div v-for="logo in partners" :key="logo">
          <img :src="logo" :alt="pick(pageLabels.partners)" loading="lazy" />
        </div>
      </div>
    </section>
  </main>
</template>
