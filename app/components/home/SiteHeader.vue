<script setup lang="ts">
import { buildSearchIndex, labels, megaPanels, navItems } from '~/data/site'

const props = withDefaults(
  defineProps<{
    homeMode?: boolean
    navOnLight?: boolean
    scrolled?: boolean
    contactHref?: string
  }>(),
  {
    homeMode: false,
    navOnLight: false,
    scrolled: true,
    contactHref: '/#contact',
  },
)

const { locale, pick, toggleLocale } = useSiteLocale()
const route = useRoute()
const activePanel = ref<string | null>(null)
const mobileMenuOpen = ref(false)
const searchOpen = ref(false)
const searchTerm = ref('')

const activeMegaPanel = computed(() => megaPanels.find((panel) => panel.id === activePanel.value))
const panelOpen = computed(() => Boolean(activeMegaPanel.value))
const isHomeTransparent = computed(
  () => props.homeMode && !props.scrolled && !props.navOnLight && !panelOpen.value,
)
const isHomeLight = computed(
  () => props.homeMode && !props.scrolled && (props.navOnLight || panelOpen.value),
)
const searchIndex = computed(() => buildSearchIndex(locale.value))
const popularLinks = computed(() => searchIndex.value.slice(0, 6))
const panelRoutes: Record<string, string> = {
  products: '/products',
  solutions: '/solutions',
  support: '/support',
  company: '/company',
}

const isActiveItem = (item: (typeof navItems)[number]) => {
  if (item.panel && activePanel.value === item.panel) return true
  if (props.homeMode && item.href === '/') return false
  if (item.href === '/') return route.path === '/'
  if (item.panel) return route.path.startsWith(panelRoutes[item.panel])
  return route.path === item.href
}
const searchResults = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) return popularLinks.value

  return searchIndex.value
    .map((item) => {
      const haystack =
        `${item.title} ${item.category} ${item.summary} ${item.keywords.join(' ')}`.toLowerCase()
      const score = item.title.toLowerCase().includes(term)
        ? 3
        : item.category.toLowerCase().includes(term)
          ? 2
          : haystack.includes(term)
            ? 1
            : 0
      return { ...item, score }
    })
    .filter((item) => item.score)
    .sort((a, b) => b.score - a.score)
})

const openPanel = (id?: string) => {
  if (!id) return
  activePanel.value = activePanel.value === id ? null : id
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  activePanel.value = null
}

const closePanel = () => {
  activePanel.value = null
  mobileMenuOpen.value = false
}

const openSearch = () => {
  searchOpen.value = true
  closePanel()
  nextTick(() => document.querySelector<HTMLInputElement>('#global-site-search')?.focus())
}

const closeSearch = () => {
  searchOpen.value = false
  searchTerm.value = ''
}

const submitSearch = () => {
  const first = searchResults.value[0]
  if (!first) return
  navigateTo(first.href)
  closeSearch()
}

const goToPanelLink = async (href: string) => {
  await navigateTo(href)
  closePanel()
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return
  closeSearch()
  closePanel()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header
    class="global-site-header"
    :class="{
      'home-mode': homeMode,
      scrolled,
      'nav-on-light': navOnLight,
      'panel-open': panelOpen,
      'is-home-transparent': isHomeTransparent,
      'is-home-light': isHomeLight,
    }"
  >
    <div class="global-site-header__inner">
      <NuxtLink class="global-site-header__brand" to="/" :aria-label="pick(labels.brand)">
        <img src="/assets/company-logo-wide.png" :alt="pick(labels.brand)" />
      </NuxtLink>

      <nav
        class="global-site-header__nav"
        :aria-label="locale === 'zh' ? '主导航' : 'Primary navigation'"
      >
        <button
          v-for="item in navItems"
          :key="item.href"
          type="button"
          :class="{ active: isActiveItem(item) }"
          :aria-expanded="item.panel ? activePanel === item.panel : undefined"
          @click="item.panel ? openPanel(item.panel) : navigateTo(item.href)"
        >
          {{ pick(item.label) }}
        </button>
      </nav>

      <div class="global-site-header__actions">
        <button
          class="global-site-header__search"
          type="button"
          :aria-label="pick(labels.search)"
          @click="openSearch"
        >
          ⌕
        </button>
        <button class="global-site-header__language" type="button" @click="toggleLocale">
          {{ pick(labels.language) }}
        </button>
        <a class="global-site-header__cta" :href="contactHref">{{ pick(labels.contactSales) }}</a>
        <button
          class="global-site-header__menu"
          type="button"
          :aria-expanded="mobileMenuOpen"
          aria-controls="global-mobile-nav"
          @click="toggleMobileMenu"
        >
          {{ pick(labels.menu) }}
        </button>
      </div>
    </div>

    <aside
      v-if="activeMegaPanel"
      class="global-mega"
      role="dialog"
      aria-modal="true"
      :aria-label="pick(activeMegaPanel.title)"
      @click.self="closePanel"
    >
      <div class="global-mega__panel">
        <div class="global-mega__head">
          <h2>{{ pick(activeMegaPanel.title) }}</h2>
          <button type="button" @click="closePanel">{{ pick(labels.close) }}</button>
        </div>
        <div class="global-mega__links">
          <NuxtLink
            v-for="link in activeMegaPanel.links"
            :key="link.href"
            :to="link.href"
            @click.prevent="goToPanelLink(link.href)"
          >
            <strong>{{ pick(link.label) }}</strong>
          </NuxtLink>
        </div>
        <div class="global-mega__quick">
          <p>{{ locale === 'zh' ? '快速入口' : 'Quick Entry' }}</p>
          <a :href="contactHref" @click="closePanel">{{
            locale === 'zh' ? '联系选型支持' : 'Contact Selection Support'
          }}</a>
        </div>
      </div>
    </aside>

    <nav
      v-if="mobileMenuOpen"
      id="global-mobile-nav"
      class="global-site-header__mobile"
      :aria-label="locale === 'zh' ? '移动端导航' : 'Mobile navigation'"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        @click="mobileMenuOpen = false"
        >{{ pick(item.label) }}</NuxtLink
      >
      <button type="button" @click="openSearch">{{ pick(labels.search) }}</button>
    </nav>
  </header>

  <div v-if="searchOpen" class="global-search" role="presentation" @click.self="closeSearch">
    <form
      class="global-search__dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
      @submit.prevent="submitSearch"
    >
      <div class="global-search__head">
        <h2 id="global-search-title">{{ locale === 'zh' ? '搜索官网' : 'Search Site' }}</h2>
        <button type="button" @click="closeSearch">{{ pick(labels.close) }}</button>
      </div>
      <div class="global-search__box">
        <input
          id="global-site-search"
          v-model="searchTerm"
          type="search"
          :placeholder="
            locale === 'zh'
              ? '搜索产品、方案、支持与公司信息'
              : 'Search products, solutions, support and company'
          "
        />
        <button v-if="searchTerm" type="button" @click="searchTerm = ''">
          {{ locale === 'zh' ? '清空' : 'Clear' }}
        </button>
      </div>
      <p v-if="!searchTerm" class="global-search__hint">
        {{ locale === 'zh' ? '常用入口' : 'Popular entries' }}
      </p>
      <p v-if="searchTerm && !searchResults.length" class="global-search__empty">
        {{ locale === 'zh' ? '没有匹配结果' : 'No results found' }}
      </p>
      <NuxtLink
        v-for="item in searchResults"
        :key="item.href"
        :to="item.href"
        class="global-search__result"
        @click="closeSearch"
      >
        <span>{{ item.category }}</span>
        <strong>{{ item.title }}</strong>
        <small>{{ item.summary }}</small>
      </NuxtLink>
    </form>
  </div>
</template>

<style scoped>
.global-site-header {
  position: sticky;
  top: 0;
  z-index: 70;
  background: #fff;
  border-bottom: 1px solid #dbe3ea;
  color: #172033;
  font-family: 'Microsoft YaHei', 'Source Sans 3', Arial, sans-serif;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
  transition:
    background 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    color 220ms ease;
}

.global-site-header.home-mode {
  position: fixed;
  inset: 0 0 auto;
  background: transparent;
  border-bottom-color: transparent;
  box-shadow: none;
}

.global-site-header.home-mode.scrolled,
.global-site-header.home-mode.nav-on-light,
.global-site-header.home-mode.panel-open {
  background: #fff;
  border-bottom-color: #dbe3ea;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
}

.global-site-header__inner {
  width: 100%;
  max-width: 1320px;
  height: 72px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
}

.global-site-header__brand img {
  display: block;
  width: 260px;
  height: auto;
}

.global-site-header__nav {
  display: flex;
  justify-self: center;
  gap: 34px;
}

.global-site-header__nav button,
.global-site-header__search,
.global-site-header__language,
.global-site-header__menu {
  min-height: 44px;
  border: 0;
  background: transparent;
  color: #334155;
  cursor: pointer;
  font-weight: 700;
}

.global-site-header.is-home-transparent .global-site-header__nav button,
.global-site-header.is-home-transparent .global-site-header__search,
.global-site-header.is-home-transparent .global-site-header__language,
.global-site-header.is-home-transparent .global-site-header__menu {
  color: #fff;
}

.global-site-header.is-home-light .global-site-header__nav button,
.global-site-header.is-home-light .global-site-header__search,
.global-site-header.is-home-light .global-site-header__language,
.global-site-header.is-home-light .global-site-header__menu {
  color: #172033;
}

.global-site-header.is-home-transparent .global-site-header__brand img {
  filter: brightness(0) invert(1);
}

.global-site-header.is-home-light .global-site-header__brand img {
  filter: none;
}

.global-site-header__nav button {
  padding: 0 14px;
  border: 2px solid transparent;
  border-radius: 6px;
  box-shadow: inset 0 0 0 0 transparent;
  transition:
    color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.global-site-header__nav button.active {
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  box-shadow: inset 0 -2px 0 var(--brand-blue);
}

.global-site-header.is-home-transparent .global-site-header__nav button.active {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  box-shadow: inset 0 -2px 0 currentColor;
}

.global-site-header__nav button:hover,
.global-site-header__nav button:focus-visible,
.global-site-header__search:hover,
.global-site-header__search:focus-visible,
.global-site-header__language:hover,
.global-site-header__language:focus-visible {
  color: var(--brand-blue);
  outline: none;
}

.global-site-header__actions {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}

.global-site-header__search {
  width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  font-size: 22px;
  line-height: 1;
  transform: translateY(-2px);
}

.global-site-header__language {
  padding: 0 8px;
}

.global-site-header__cta {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border: 1px solid var(--brand-blue);
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  font-weight: 700;
  border-radius: 0;
}

.global-site-header__cta:hover,
.global-site-header__cta:focus-visible {
  background: var(--brand-blue-bg);
  outline: none;
}

.global-site-header__menu {
  display: none;
  border: 1px solid #dbe3ea;
  padding: 0 12px;
}

.global-site-header__mobile {
  display: none;
}

.global-mega {
  position: fixed;
  inset: 72px auto auto 0;
  z-index: 71;
  width: clamp(360px, 25vw, 424px);
  min-height: calc(100dvh - 72px);
  background: transparent;
}

.global-mega__panel {
  width: 100%;
  min-height: calc(100dvh - 72px);
  padding: 30px 28px;
  background: #fff;
  box-shadow: 18px 0 42px rgba(15, 23, 42, 0.08);
  overflow-y: auto;
}

.global-mega__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.global-mega__head h2 {
  margin: 0;
  color: #0f172a;
  font-size: 24px;
  line-height: 1.2;
}

.global-mega__head button,
.global-search__head button,
.global-search__box button {
  min-width: 44px;
  min-height: 44px;
  border: 0;
  background: transparent;
  color: #172033;
  cursor: pointer;
  font-size: 0;
}

.global-mega__head button::before {
  content: '×';
  font-size: 30px;
  font-weight: 300;
  line-height: 1;
}

.global-mega__links {
  display: grid;
  gap: 0;
  margin-top: 34px;
}

.global-mega__links a {
  display: block;
  padding: 16px 14px;
  border: 0;
  background: #fff;
  color: #172033;
  transition:
    color 180ms ease,
    background 180ms ease;
}

.global-mega__links a:hover,
.global-mega__links a:focus-visible {
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  outline: none;
}

.global-search__result span {
  color: var(--brand-blue);
  font-size: 13px;
  font-weight: 800;
}

.global-mega__links strong {
  font-size: 16px;
  line-height: 1.4;
}

.global-search__result small {
  color: #64748b;
}

.global-mega__quick {
  margin-top: 34px;
  padding-top: 22px;
  border-top: 1px solid #d9e1ea;
}

.global-mega__quick p {
  margin: 0 0 12px;
  color: var(--brand-blue);
  font-size: 14px;
  font-weight: 800;
}

.global-mega__quick a {
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 6px;
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  font-weight: 800;
}

.global-search {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: start center;
  padding: 12vh 20px;
  background: rgba(2, 6, 23, 0.62);
}

.global-search__dialog {
  width: min(680px, 100%);
  max-height: 76vh;
  overflow: auto;
  padding: 26px;
  background: #fff;
  box-shadow: 0 22px 80px rgba(0, 0, 0, 0.3);
}

.global-search__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.global-search__head h2 {
  margin: 0;
  color: #0f172a;
  font-size: 24px;
}

.global-search__box {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  margin: 22px 0;
}

.global-search__box input {
  width: 100%;
  border: 1px solid #b8c5d1;
  padding: 12px;
  background: #fff;
}

.global-search__hint,
.global-search__empty {
  color: #64748b;
}

.global-search__result {
  display: grid;
  gap: 4px;
  padding: 14px 0;
  border-top: 1px solid #dbe3ea;
}

@media (max-width: 900px) {
  .global-site-header__inner {
    display: flex;
    justify-content: space-between;
  }

  .global-site-header__actions {
    margin-left: auto;
  }

  .global-site-header__nav,
  .global-site-header__cta {
    display: none;
  }

  .global-site-header__menu {
    display: inline-flex;
    align-items: center;
  }

  .global-site-header__mobile {
    display: grid;
    padding: 14px 20px;
    border-top: 1px solid #dbe3ea;
    background: #fff;
  }

  .global-site-header__mobile a,
  .global-site-header__mobile button {
    min-height: 44px;
    padding: 12px 0;
    border: 0;
    background: transparent;
    color: #172033;
    text-align: left;
    font-size: 16px;
  }
}

@media (max-width: 760px) {
  .global-site-header__inner {
    padding: 0 20px;
  }
}

@media (max-width: 560px) {
  .global-site-header__inner {
    width: 100%;
    height: 62px;
    gap: 12px;
  }

  .global-site-header__brand img {
    width: 132px;
  }

  .global-site-header__search {
    display: none;
  }

  .global-mega {
    inset: 62px 0 auto 0;
    width: 100%;
    min-height: calc(100dvh - 62px);
  }

  .global-mega__panel {
    width: 100%;
    min-height: calc(100dvh - 62px);
    padding: 20px;
  }

  .global-search__box {
    grid-template-columns: 1fr;
  }
}
</style>
