<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { locale } = useSiteLocale()

const returnHome = async () => {
  await clearError({ redirect: '/' })
}
</script>

<template>
  <main class="error-page">
    <p class="error-page__code">{{ props.error.statusCode || 500 }}</p>
    <h1>{{ locale === 'zh' ? '页面暂时无法打开' : 'This page is unavailable' }}</h1>
    <p>
      {{
        locale === 'zh'
          ? '请返回首页继续浏览，或稍后再次尝试。'
          : 'Return to the homepage or try again in a moment.'
      }}
    </p>
    <button type="button" @click="returnHome">
      {{ locale === 'zh' ? '返回首页' : 'Back to home' }}
    </button>
  </main>
</template>

<style>
.error-page {
  min-height: 70vh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 14px;
  padding: 48px 20px;
  color: #172033;
  text-align: center;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.error-page__code {
  margin: 0;
  color: var(--brand-blue, #1e48a5);
  font-size: 14px;
  font-weight: 800;
}

.error-page h1,
.error-page p {
  margin: 0;
}

.error-page h1 {
  font-size: clamp(28px, 5vw, 44px);
}

.error-page > p:not(.error-page__code) {
  color: #64748b;
}

.error-page button {
  min-height: 44px;
  margin-top: 12px;
  padding: 0 20px;
  border: 1px solid var(--brand-blue, #1e48a5);
  background: var(--brand-blue-bg, #f2f7fa);
  color: var(--brand-blue, #1e48a5);
  font-weight: 700;
  cursor: pointer;
}
</style>
