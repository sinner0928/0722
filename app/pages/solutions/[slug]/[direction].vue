<script setup lang="ts">
import { findSolution, labels, products } from '~/data/site'
import {
  findSolutionDirection,
  getSolutionDirections,
  solutionDirectionLabels,
} from '~/data/solution-directions'

const route = useRoute()
const { locale, pick } = useSiteLocale()

const solution = computed(() => findSolution(route.params.slug as string))
const direction = computed(() => {
  if (!solution.value) return undefined
  return findSolutionDirection(solution.value.slug, route.params.direction as string)
})
const siblingDirections = computed(() => {
  if (!solution.value) return []
  return getSolutionDirections(solution.value.slug)
})
const recommendedProducts = computed(() => {
  const slugs = direction.value?.products ?? solution.value?.products ?? []
  return slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean)
})
const directionLabel = computed(() => {
  if (!solution.value) return labels.solutions
  return solutionDirectionLabels[solution.value.slug] ?? labels.solutions
})

if (!solution.value || !direction.value) {
  throw createError({ statusCode: 404, statusMessage: '未找到产品方向' })
}

useSeoMeta({
  title: () => `${pick(direction.value!.title)} | ${pick(solution.value!.name)} | 壹原理`,
  description: () => pick(direction.value!.text),
})
</script>

<template>
  <main class="solution-page direction-page">
    <nav class="breadcrumb" aria-label="breadcrumb">
      <NuxtLink to="/">{{ pick(labels.home) }}</NuxtLink>
      <span>›</span>
      <NuxtLink to="/#solutions">{{ pick(labels.solutions) }}</NuxtLink>
      <span>›</span>
      <NuxtLink :to="`/solutions/${solution!.slug}`">{{ pick(solution!.name) }}</NuxtLink>
      <span>›</span>
      <strong>{{ pick(direction!.title) }}</strong>
    </nav>

    <section class="solution-hero direction-hero">
      <div class="solution-hero__copy">
        <p>{{ pick(directionLabel) }}</p>
        <h1>{{ pick(direction!.title) }}</h1>
        <p>{{ pick(direction!.text) }}</p>
        <a href="#overview">{{ locale === 'zh' ? '查看方向详情' : 'View Details' }}</a>
      </div>
      <img :src="solution!.image" :alt="pick(direction!.title)" />
    </section>

    <nav
      class="solution-tabs"
      :aria-label="locale === 'zh' ? '产品方向详情标签' : 'Direction detail tabs'"
    >
      <a href="#overview" aria-current="page">{{ locale === 'zh' ? '方向概述' : 'Overview' }}</a>
      <a href="#applications">{{ locale === 'zh' ? '应用方向' : 'Applications' }}</a>
      <a href="#products">{{ locale === 'zh' ? '推荐产品' : 'Recommended Products' }}</a>
      <a href="#directions">{{ locale === 'zh' ? '其他方向' : 'Other Directions' }}</a>
    </nav>

    <section id="overview" class="content-section">
      <p class="kicker">{{ pick(directionLabel) }}</p>
      <h2>{{ locale === 'zh' ? '方向概述' : 'Direction Overview' }}</h2>
      <p>{{ pick(direction!.overview) }}</p>
      <div class="feature-grid">
        <strong v-for="item in direction!.highlights" :key="pick(item)">{{ pick(item) }}</strong>
      </div>
    </section>

    <section id="applications" class="directions-section direction-detail-band">
      <div class="section-head">
        <div>
          <p class="kicker">{{ locale === 'zh' ? '应用方向' : 'Applications' }}</p>
          <h2>{{ locale === 'zh' ? '适配的产品与场景' : 'Matched Products and Scenarios' }}</h2>
        </div>
        <p>
          {{
            locale === 'zh'
              ? '围绕该具体产品方向，整理适合落地的典型应用入口。'
              : 'Typical application entries for this product direction.'
          }}
        </p>
      </div>
      <div class="direction-detail-grid">
        <article
          v-for="(item, index) in direction!.applications"
          :key="pick(item)"
          class="direction-detail-card"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ pick(item) }}</strong>
        </article>
      </div>
    </section>

    <section id="products" class="content-section muted">
      <p class="kicker">{{ locale === 'zh' ? '推荐产品' : 'Recommended Products' }}</p>
      <h2>{{ locale === 'zh' ? '匹配该方向的产品选择' : 'Products Matched to This Direction' }}</h2>
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

    <section id="directions" class="content-section">
      <p class="kicker">{{ locale === 'zh' ? '其他方向' : 'Other Directions' }}</p>
      <h2>
        {{
          locale === 'zh'
            ? '返回查看同方案下的产品方向'
            : 'Explore More Directions in This Solution'
        }}
      </h2>
      <div class="direction-link-grid">
        <NuxtLink
          v-for="item in siblingDirections"
          :key="item.slug"
          :to="`/solutions/${solution!.slug}/${item.slug}`"
          :class="{ current: item.slug === direction!.slug }"
        >
          {{ pick(item.title) }}
        </NuxtLink>
      </div>
      <NuxtLink class="back-link" :to="`/solutions/${solution!.slug}`">
        {{ locale === 'zh' ? '返回方案详情' : 'Back to Solution' }}
      </NuxtLink>
    </section>
  </main>
</template>
