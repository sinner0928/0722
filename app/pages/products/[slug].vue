<script setup lang="ts">
import { l, labels, products } from '~/data/site'

const route = useRoute()
const { locale, pick } = useSiteLocale()
const product = computed(() => products.find((item) => item.slug === route.params.slug))

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const pageLabels = {
  overview: l('产品简介', 'Product Overview'),
  specs: l('参数规格', 'Specifications'),
  resources: l('软件及资料', 'Resources'),
  productSpecs: l('产品参数', 'Product Specifications'),
  detailsNav: l('产品详情导航', 'Product detail navigation'),
  getResources: l('获取软件及资料', 'Get software and resources'),
}

useSeoMeta({
  title: () => `${pick(product.value!.name)} | ${pick(labels.brand)}`,
  description: () => pick(product.value!.summary),
})
</script>

<template>
  <main class="detail-page">
    <nav class="detail-breadcrumb" aria-label="breadcrumb">
      <NuxtLink to="/">{{ pick(labels.home) }}</NuxtLink>
      <span aria-hidden="true">&rsaquo;</span>
      <NuxtLink to="/#products">{{ pick(labels.products) }}</NuxtLink>
      <span aria-hidden="true">&rsaquo;</span>
      <strong>{{ pick(product!.name) }}</strong>
    </nav>

    <section class="detail-hero">
      <div class="detail-hero__inner">
        <div class="detail-hero__copy">
          <p>{{ pick(product!.category) }}</p>
          <h1>{{ pick(product!.name) }}</h1>
          <p>{{ pick(product!.summary) }}</p>
        </div>
      </div>
    </section>

    <nav class="detail-tabs" :aria-label="pick(pageLabels.detailsNav)">
      <a href="#overview">{{ pick(pageLabels.overview) }}</a>
      <a href="#specs">{{ pick(pageLabels.specs) }}</a>
      <a href="#resources">{{ pick(pageLabels.resources) }}</a>
    </nav>

    <section id="overview" class="detail-content-section">
      <p class="detail-kicker">{{ pick(product!.category) }}</p>
      <h2>{{ pick(pageLabels.overview) }}</h2>
      <p>{{ pick(product!.overview) }}</p>
    </section>

    <section id="specs" class="detail-band">
      <div class="detail-section-head">
        <div>
          <p class="detail-kicker">{{ pick(pageLabels.productSpecs) }}</p>
          <h2>{{ pick(pageLabels.specs) }}</h2>
        </div>
        <p>{{ pick(product!.summary) }}</p>
      </div>
      <div class="detail-card-grid">
        <article v-for="(item, index) in product!.specs" :key="pick(item[0])" class="detail-info-card">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ pick(item[0]) }}</strong>
          <p>{{ pick(item[1]) }}</p>
        </article>
      </div>
    </section>

    <section id="resources" class="detail-content-section muted">
      <p class="detail-kicker">{{ pick(pageLabels.resources) }}</p>
      <h2>{{ pick(pageLabels.resources) }}</h2>
      <div class="detail-card-grid">
        <article v-for="(item, index) in product!.uses" :key="pick(item)" class="detail-info-card">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ pick(item) }}</strong>
        </article>
      </div>
      <a class="cta" href="/#contact">{{ pick(pageLabels.getResources) }}</a>
    </section>
  </main>
</template>
