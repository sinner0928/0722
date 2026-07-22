<script setup lang="ts">
const stats = [
  { value: '50+', label: '员工人数' },
  { value: '50%+', label: '技术研发人员占比' },
  { value: '10,000,000+ PCS', label: '月均出货量' },
  { value: '4 条', label: '产品/方案线' },
]

const capabilities = [
  {
    title: '深度定制协议栈',
    text: '根据产品形态和交互要求，提供适配的无线协议与软件方案。',
  },
  {
    title: '原厂级方案能力',
    text: '从芯片应用到软硬件协同开发，推进方案快速落地。',
  },
  {
    title: '贴身服务快速响应',
    text: '贴近项目节奏进行技术沟通与问题响应，缩短验证周期。',
  },
  {
    title: '高性价比及供货保证',
    text: '兼顾性能、成本与稳定供货，支持产品持续量产。',
  },
]

const offices = [
  { type: '总部', city: '杭州', text: '壹原理科技总部所在地。' },
  { type: '研发中心', city: '深圳', text: '壹原理科技研发中心所在地。' },
  { type: '研发中心', city: '上海', text: '壹原理科技研发中心所在地。' },
]

const partners = [
  '/assets/partners/partner-01.png',
  '/assets/partners/partner-02.png',
  '/assets/partners/partner-03.png',
  '/assets/partners/partner-04.png',
  '/assets/partners/partner-05.png',
  '/assets/partners/partner-06.png',
  '/assets/partners/partner-07.png',
  '/assets/partners/partner-08.png',
  '/assets/partners/partner-09.png',
]
</script>

<template>
  <main class="company">
    <nav class="company-breadcrumb" aria-label="breadcrumb">
      <NuxtLink to="/">首页</NuxtLink>
      <span>›</span>
      <strong>公司介绍</strong>
    </nav>

    <section class="company-hero">
      <div class="company-hero__copy">
        <div>
          <p>关于壹原理</p>
          <h1>立足中国，服务全球</h1>
          <p>
            壹原理科技总部位于杭州，并在深圳、上海设立研发中心，面向全球智能硬件与物联网领域提供射频技术、嵌入式解决方案及全周期技术支持。
          </p>
          <NuxtLink to="/#contact">联系合作</NuxtLink>
        </div>
      </div>

      <div class="company-hero__brand" aria-label="壹原理品牌">
        <img src="/assets/company-logo-wide.png" alt="YIPRINCIPLE" />
        <p>射频技术与嵌入式解决方案</p>
      </div>
    </section>

    <section id="overview" class="company-section company-section--overview">
      <header class="company-section__title">
        <span>01</span>
        <h2>公司概览</h2>
      </header>

      <dl class="company-stats">
        <div v-for="stat in stats" :key="stat.label">
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
    </section>

    <section id="capability" class="company-section company-section--muted">
      <header class="company-section__title">
        <span>02</span>
        <h2>核心能力</h2>
      </header>

      <div class="company-capabilities">
        <article v-for="(item, index) in capabilities" :key="item.title">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section id="network" class="company-section">
      <header class="company-section__title">
        <span>03</span>
        <h2>研发网络</h2>
      </header>

      <p class="company-section__intro">
        以射频技术与嵌入式解决方案为技术定位，为产品从方案定义到落地提供协同支持。
      </p>

      <div class="company-offices">
        <article v-for="office in offices" :key="office.city">
          <p>{{ office.type }}</p>
          <h3>{{ office.city }}</h3>
          <span>{{ office.text }}</span>
        </article>
      </div>
    </section>

    <section id="partners" class="company-section company-section--partners">
      <header class="company-section__title">
        <span>04</span>
        <h2>合作伙伴</h2>
      </header>

      <div class="company-partners">
        <div v-for="logo in partners" :key="logo">
          <img :src="logo" alt="合作伙伴标识" loading="lazy" />
        </div>
      </div>
    </section>
  </main>
</template>
