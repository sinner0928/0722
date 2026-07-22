<script setup lang="ts">
import { labels, products } from '~/data/site'

const { locale, pick } = useSiteLocale()
</script>

<template>
  <section id="products" class="product-showcase">
    <div class="shell">
      <h2>{{ pick(labels.products) }}</h2>
      <div class="product-tabs">
        <NuxtLink
          v-for="product in products"
          :key="product.slug"
          :to="`/products/${product.slug}`"
          class="product-tab"
        >
          <strong>{{ pick(product.name) }}</strong>
          <span>{{ locale === 'zh' ? '查看产品  ->' : 'View Product  ->' }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
