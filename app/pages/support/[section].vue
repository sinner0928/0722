<script setup lang="ts">
import { labels, supportSections } from '~/data/site'

const route = useRoute()
const { locale, pick } = useSiteLocale()
const keyword = ref('')
const activeCategory = ref('all')

const section = computed(() => supportSections.find((item) => item.slug === route.params.section))
const sectionRows = computed(() => section.value?.rows ?? [])
const faqs = computed(() => {
  const currentSection = section.value
  return currentSection && 'faqs' in currentSection ? currentSection.faqs : []
})
const categoryOptions = computed(() => {
  const categories = sectionRows.value.map((row) => ({
    key: row.category.zh,
    label: pick(row.category),
  }))
  const unique = categories.filter(
    (item, index, array) => array.findIndex((entry) => entry.key === item.key) === index,
  )
  return [{ key: 'all', label: locale.value === 'zh' ? '全部' : 'All' }, ...unique]
})
const rows = computed(() => {
  const term = keyword.value.trim().toLowerCase()
  return sectionRows.value.filter((row) => {
    const matchesCategory = activeCategory.value === 'all' || row.category.zh === activeCategory.value
    const text = `${pick(row.name)} ${pick(row.category)} ${pick(row.description)} ${pick(row.status)}`
    return matchesCategory && (!term || text.toLowerCase().includes(term))
  })
})

watch(section, () => {
  keyword.value = ''
  activeCategory.value = 'all'
})

if (!section.value) throw createError({ statusCode: 404, statusMessage: '未找到支持资源' })

useSeoMeta({
  title: () => `${pick(section.value!.title)} | ${pick(labels.support)} | 壹原理`,
  description: () => pick(section.value!.intro),
})
</script>

<template>
  <main class="support-page">
    <nav class="support-breadcrumb" aria-label="breadcrumb">
      <NuxtLink to="/">{{ pick(labels.home) }}</NuxtLink>
      <span>›</span>
      <NuxtLink to="/#support">{{ locale === 'zh' ? '服务与支持' : 'Service & Support' }}</NuxtLink>
      <span>›</span>
      <strong>{{ pick(section!.title) }}</strong>
    </nav>

    <section class="support-hero">
      <div class="support-hero__content">
        <p>{{ locale === 'zh' ? '服务与支持' : 'Service & Support' }}</p>
        <h1>{{ pick(section!.title) }}</h1>
        <p>{{ pick(section!.intro) }}</p>
        <a href="/#contact">{{ locale === 'zh' ? '联系技术支持' : 'Contact Support' }}</a>
      </div>
    </section>

    <div class="support-layout">
      <aside class="support-sidebar">
        <nav :aria-label="locale === 'zh' ? '支持中心导航' : 'Support navigation'">
          <NuxtLink
            v-for="item in supportSections"
            :key="item.slug"
            :to="`/support/${item.slug}`"
            :aria-current="item.slug === route.params.section ? 'page' : undefined"
          >
            {{ pick(item.title) }}
          </NuxtLink>
        </nav>
      </aside>

      <section
        class="support-resources"
        :aria-label="locale === 'zh' ? '资源列表' : 'Resource list'"
      >
        <div class="support-toolbar">
          <input
            v-model="keyword"
            type="search"
            :placeholder="locale === 'zh' ? '搜索当前页面资料' : 'Search current resources'"
          />
          <div
            class="support-filters"
            :aria-label="locale === 'zh' ? '资源分类' : 'Resource categories'"
          >
            <button
              v-for="category in categoryOptions"
              :key="category.key"
              type="button"
              :class="{ current: activeCategory === category.key }"
              @click="activeCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
        </div>

        <div class="support-section-title">
          <div>
            <p>{{ locale === 'zh' ? '开发资源' : 'Development Resources' }}</p>
            <h2>
              {{
                locale === 'zh'
                  ? `${pick(section!.title)} 与接入资料`
                  : `${pick(section!.title)} Resources`
              }}
            </h2>
          </div>
          <strong>{{ rows.length }} {{ locale === 'zh' ? '项' : 'items' }}</strong>
        </div>

        <div class="support-table-wrap">
          <table class="support-table">
            <thead>
              <tr>
                <th>{{ locale === 'zh' ? '资料名称' : 'Name' }}</th>
                <th>{{ locale === 'zh' ? '分类' : 'Category' }}</th>
                <th>{{ locale === 'zh' ? '说明' : 'Description' }}</th>
                <th>{{ locale === 'zh' ? '状态' : 'Status' }}</th>
                <th>{{ locale === 'zh' ? '操作' : 'Action' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row.name.zh">
                <td>
                  <strong>{{ pick(row.name) }}</strong>
                </td>
                <td>
                  <span>{{ pick(row.category) }}</span>
                </td>
                <td>{{ pick(row.description) }}</td>
                <td>
                  <em>{{ pick(row.status) }}</em>
                </td>
                <td>
                  <a href="/#contact">{{ locale === 'zh' ? '联系技术支持' : 'Contact Support' }}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-if="!rows.length" class="support-empty">
          {{
            locale === 'zh'
              ? '未找到匹配资料，请调整关键词或联系技术支持。'
              : 'No matching resources found. Try another keyword or contact support.'
          }}
        </p>

        <section
          v-if="faqs.length"
          class="support-faq"
          :aria-label="locale === 'zh' ? '常见问题' : 'Frequently asked questions'"
        >
          <div class="support-section-title">
            <div>
              <p>{{ locale === 'zh' ? '常见问题' : 'Frequently Asked Questions' }}</p>
              <h2>{{ locale === 'zh' ? '快速了解支持流程' : 'Support Process at a Glance' }}</h2>
            </div>
          </div>

          <div class="support-faq__list">
            <details v-for="faq in faqs" :key="faq.question.zh">
              <summary>{{ pick(faq.question) }}</summary>
              <p>{{ pick(faq.answer) }}</p>
            </details>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>
