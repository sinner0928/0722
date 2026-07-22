<script setup lang="ts">
import { findSolution, labels, l, products } from '~/data/site'
import { getSolutionDirections, solutionDirectionLabels } from '~/data/solution-directions'

const route = useRoute()
const { locale, pick } = useSiteLocale()

const solution = computed(() => findSolution(route.params.slug as string))
const directions = computed(() => {
  if (!solution.value) return []
  const storedDirections = getSolutionDirections(solution.value.slug)
  if (storedDirections.length) return storedDirections
  return solution.value.scenes.map((scene, index) => ({
    slug: `direction-${index + 1}`,
    title: scene,
    text: solution.value!.summary,
    overview: solution.value!.overview,
    applications: solution.value!.scenes,
    highlights: solution.value!.features,
    products: [...solution.value!.products],
  }))
})
const directionLabel = computed(() => {
  if (!solution.value) return l('产品方向', 'Product Directions')
  return solutionDirectionLabels[solution.value.slug] ?? l('产品方向', 'Product Directions')
})
const recommendedProducts = computed(() => {
  if (!solution.value) return []
  return solution.value.products
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean)
})

if (!solution.value) {
  throw createError({ statusCode: 404, statusMessage: '未找到解决方案' })
}

useSeoMeta({
  title: () => `${pick(solution.value!.name)} | 壹原理`,
  description: () => pick(solution.value!.summary),
})
</script>

<template>
  <main class="solution-page">
    <nav class="breadcrumb" aria-label="breadcrumb">
      <NuxtLink to="/">{{ pick(labels.home) }}</NuxtLink>
      <span>›</span>
      <NuxtLink to="/#solutions">{{ pick(labels.solutions) }}</NuxtLink>
      <span>›</span>
      <strong>{{ pick(solution!.name) }}</strong>
    </nav>

    <section class="solution-hero">
      <div class="solution-hero__copy">
        <p>{{ pick(labels.solutions) }}</p>
        <h1>{{ pick(solution!.name) }}</h1>
        <p>{{ pick(solution!.summary) }}</p>
        <a href="#directions">{{
          locale === 'zh' ? '选择产品方向' : 'Select Product Direction'
        }}</a>
      </div>
      <img :src="solution!.image" :alt="pick(solution!.name)" />
    </section>

    <nav
      class="solution-tabs"
      :aria-label="locale === 'zh' ? '方案详情标签' : 'Solution detail tabs'"
    >
      <a href="#directions" aria-current="page">{{
        locale === 'zh' ? '具体产品方向' : 'Product Directions'
      }}</a>
      <a href="#overview">{{ locale === 'zh' ? '方案概述' : 'Solution Overview' }}</a>
      <a href="#products">{{ locale === 'zh' ? '推荐产品' : 'Recommended Products' }}</a>
    </nav>

    <section id="directions" class="directions-section">
      <div class="section-head">
        <div>
          <p class="kicker">{{ pick(directionLabel) }}</p>
          <h2>{{ locale === 'zh' ? '选择具体产品方向' : 'Select Product Direction' }}</h2>
        </div>
        <p>
          {{
            locale === 'zh'
              ? '进入对应方向查看方案介绍、应用场景和推荐产品。'
              : 'Enter a direction to view solution details, applications and recommended products.'
          }}
        </p>
      </div>

      <div class="direction-grid">
        <NuxtLink
          v-for="(item, index) in directions"
          :key="item.slug"
          class="direction-card"
          :to="`/solutions/${solution!.slug}/${item.slug}`"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ pick(item.title) }}</h3>
          <p>{{ pick(item.text) }}</p>
          <strong>{{ locale === 'zh' ? '进入产品方向' : 'Enter Direction' }}</strong>
        </NuxtLink>
      </div>
    </section>

    <section id="overview" class="content-section">
      <p class="kicker">{{ pick(labels.solutions) }}</p>
      <h2>{{ locale === 'zh' ? '方案概述' : 'Solution Overview' }}</h2>
      <p>{{ pick(solution!.overview) }}</p>
      <div class="feature-grid">
        <strong v-for="item in solution!.features" :key="pick(item)">{{ pick(item) }}</strong>
      </div>
    </section>

    <section id="products" class="content-section muted">
      <p class="kicker">{{ locale === 'zh' ? '推荐产品' : 'Recommended Products' }}</p>
      <h2>{{ locale === 'zh' ? '匹配方案的产品选择' : 'Products Matched to This Solution' }}</h2>
      <div class="product-grid">
        <NuxtLink
          v-for="product in recommendedProducts"
          :key="product!.slug"
          :to="`/products/${product!.slug}`"
        >
          <span>{{ pick(product!.category) }}</span>
          <strong>{{ pick(product!.name) }}</strong>
          <small>{{ pick(product!.summary) }}</small>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
