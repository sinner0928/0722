<script setup lang="ts">
import { heroSlides } from '~/data/site'

const { locale, pick } = useSiteLocale()
const activeSlide = ref(0)
const scrolled = ref(false)
const dragStart = ref<number | null>(null)
const dragPointerId = ref<number | null>(null)
const didDrag = ref(false)

const navOnLight = computed(
  () => !scrolled.value && heroSlides[activeSlide.value].navTone === 'dark',
)
let carouselTimer: ReturnType<typeof setInterval> | undefined

const goToSlide = (index: number) => {
  activeSlide.value = (index + heroSlides.length) % heroSlides.length
}

const restartCarousel = () => {
  clearInterval(carouselTimer)
  carouselTimer = setInterval(() => goToSlide(activeSlide.value + 1), 5000)
}

const selectSlide = (index: number) => {
  goToSlide(index)
  restartCarousel()
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    goToSlide(activeSlide.value - 1)
    restartCarousel()
  }
  if (event.key === 'ArrowRight') {
    goToSlide(activeSlide.value + 1)
    restartCarousel()
  }
}

const startDrag = (event: PointerEvent) => {
  if (event.pointerType === 'mouse' && event.button !== 0) return
  dragStart.value = event.clientX
  dragPointerId.value = event.pointerId
  didDrag.value = false
  event.currentTarget.setPointerCapture(event.pointerId)
}

const handleDragEnd = (event: PointerEvent) => {
  if (dragStart.value === null || dragPointerId.value !== event.pointerId) return
  const diff = event.clientX - dragStart.value
  if (Math.abs(diff) > 40) {
    goToSlide(activeSlide.value + (diff < 0 ? 1 : -1))
    restartCarousel()
    didDrag.value = true
  }
  dragStart.value = null
  dragPointerId.value = null
  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId)
  }
}

const cancelDrag = (event: PointerEvent) => {
  dragStart.value = null
  dragPointerId.value = null
  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId)
  }
}

const openHeroLink = (event: MouseEvent) => {
  if (!didDrag.value) return
  event.preventDefault()
  didDrag.value = false
}

onMounted(() => {
  const previousScrollRestoration = history.scrollRestoration
  history.scrollRestoration = 'manual'

  if (window.location.hash) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }

  nextTick(() => requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' })))
  restartCarousel()
  const onScroll = () => {
    const heroHeight = document.querySelector<HTMLElement>('.hero')?.offsetHeight ?? 560
    scrolled.value = window.scrollY >= heroHeight - 72
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('keydown', onKeydown)
    history.scrollRestoration = previousScrollRestoration
  })
})

onUnmounted(() => clearInterval(carouselTimer))

useSeoMeta({
  title: () =>
    locale.value === 'zh'
      ? '壹原理 | 低功耗蓝牙 SoC、NFC 与行业解决方案'
      : 'YiYuanLi | BLE SoC, NFC and Industry Solutions',
  description: () =>
    locale.value === 'zh'
      ? '壹原理企业官网静态原型，展示低功耗蓝牙、SoC、NFC、蓝牙模组、行业方案、支持中心与联系入口。'
      : 'Static enterprise website prototype for BLE, SoC, NFC, Bluetooth modules, ' +
        'solutions, support and contact entries.',
})
</script>

<template>
  <div>
    <a class="skip-link" href="#main">{{
      locale === 'zh' ? '跳到主要内容' : 'Skip to main content'
    }}</a>

    <HomeSiteHeader
      home-mode
      :nav-on-light="navOnLight"
      :scrolled="scrolled"
      contact-href="#contact"
    />

    <main id="main">
      <section
        id="top"
        class="hero"
        :class="{ 'slide-light': heroSlides[activeSlide].navTone === 'dark' }"
        :aria-label="locale === 'zh' ? '首页轮播图' : 'Home carousel'"
      >
        <div class="home-shell hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">{{ locale === 'zh' ? '产品与解决方案' : 'Products & Solutions' }}</p>
            <div class="hero-copy-slides">
              <div
                v-for="(slide, index) in heroSlides"
                :key="slide.href"
                class="hero-copy-slide"
                :class="{ active: index === activeSlide }"
              >
                <h1>{{ pick(slide.title) }}</h1>
                <p>{{ pick(slide.text) }}</p>
              </div>
            </div>
            <div class="hero-actions">
              <NuxtLink class="primary-button" :to="heroSlides[activeSlide].href">{{
                locale === 'zh' ? '进入详情' : 'Open Details'
              }}</NuxtLink>
              <a class="text-link" href="#contact">{{
                locale === 'zh' ? '联系选型支持' : 'Contact Selection Support'
              }}</a>
            </div>
          </div>
          <NuxtLink
            class="hero-media active"
            :to="heroSlides[activeSlide].href"
            @pointerdown="startDrag($event)"
            @pointerup="handleDragEnd($event)"
            @pointercancel="cancelDrag($event)"
            @click="openHeroLink"
            @dragstart.prevent
          >
            <img
              :key="heroSlides[activeSlide].image"
              :src="heroSlides[activeSlide].image"
              :alt="pick(heroSlides[activeSlide].title)"
              draggable="false"
            />
          </NuxtLink>
          <div class="slider-row" :aria-label="locale === 'zh' ? '轮播控制' : 'Carousel controls'">
            <div class="slider-dots">
              <button
                v-for="(_, index) in heroSlides"
                :key="index"
                type="button"
                :class="{ active: index === activeSlide }"
                :aria-label="`${index + 1}`"
                @click="selectSlide(index)"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeProductShowcase />
      <HomeSolutionShowcase />
      <HomeSupportCenter />

      <HomeCompanyIntro />
      <HomeContactSection />
    </main>
  </div>
</template>

<style>
:root {
  --navy: #0f172a;
  --ink: #172033;
  --blue: var(--brand-blue);
  --sky: #e9f4fa;
  --paper: #fff;
  --muted: #f5f7f9;
  --line: #dbe3ea;
  --soft: #eef4f8;
  --shadow: 0 18px 44px rgba(15, 23, 42, 0.12);
}
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  line-height: 1.55;
}
a {
  color: inherit;
  text-decoration: none;
}
button,
input,
textarea {
  font: inherit;
}
button,
a {
  touch-action: manipulation;
}
.home-shell {
  width: min(1180px, calc(100% - 40px));
  margin: auto;
}
.skip-link {
  position: fixed;
  left: 12px;
  top: -60px;
  z-index: 1000;
  background: #fff;
  padding: 10px;
}
.skip-link:focus {
  top: 12px;
}
.primary-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border: 1px solid var(--brand-blue);
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  font-weight: 700;
  cursor: pointer;
}
.primary-button:hover {
  background: var(--brand-blue-bg);
}
.hero {
  min-height: 560px;
  position: relative;
  background: #020b13 !important;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-user-select: none;
}
.hero-grid {
  display: block !important;
  position: relative;
  min-height: 560px;
  padding: 210px 0 66px !important;
}
.hero-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(0, 5, 9, 0.94) 0%,
    rgba(0, 10, 18, 0.62) 42%,
    rgba(1, 14, 28, 0.12) 100%
  );
  transition: background 0.22s ease;
}
.hero-copy {
  position: relative;
  z-index: 2;
  max-width: 620px;
}
.eyebrow {
  margin: 0 0 12px;
  color: var(--blue);
  font-size: 14px;
  font-weight: 800;
}
.hero-copy > .eyebrow {
  color: #fff;
}
.hero h1,
.section h2,
.company-section h2 {
  margin: 0;
  color: var(--navy);
  font-size: 48px;
  line-height: 1.14;
  letter-spacing: 0;
}
.hero h1 {
  color: #fff !important;
  font-size: 52px !important;
  line-height: 1.12 !important;
}
.hero-copy-slide > p {
  margin: 12px 0 0;
  color: #dbeafe;
  font-size: 18px;
}
.hero-actions {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 28px !important;
}
.hero-actions .text-link {
  display: none;
}
.hero-actions .primary-button {
  min-height: 46px;
  padding: 0 34px;
  background: transparent !important;
  border: 2px solid #fff;
  color: #fff !important;
}
.hero-actions .primary-button:hover {
  background: #fff !important;
  color: #07111f !important;
}
.text-link {
  font-weight: 800;
  color: #334155;
}
.hero-media {
  position: absolute !important;
  inset: 0 !important;
  z-index: 0 !important;
  display: block !important;
  width: 100vw !important;
  height: 100% !important;
  max-width: none !important;
  left: 50% !important;
  transform: translateX(-50%);
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.58s ease;
}
.hero-media.active {
  opacity: 1;
  pointer-events: auto;
}
.hero-media img {
  width: 100% !important;
  height: 100% !important;
  aspect-ratio: auto !important;
  object-fit: cover !important;
  box-shadow: none !important;
  opacity: 1;
  transform: scale(1.025);
  transition: transform 0.9s ease;
  -webkit-user-drag: none;
  user-select: none;
}
.hero-media.active img {
  transform: scale(1);
}
.hero-copy-slides {
  display: grid;
}
.hero-copy-slide {
  grid-area: 1/1;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition:
    opacity 0.58s ease,
    transform 0.58s ease;
}
.hero-copy-slide.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.slider-row {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 !important;
}
.slider-dots {
  display: flex;
  gap: 8px;
}
.slider-dots button {
  width: 28px !important;
  height: 5px;
  border: 0;
  background: rgba(255, 255, 255, 0.42) !important;
  cursor: pointer;
}
.slider-dots button.active {
  background: var(--brand-blue-bg) !important;
}
.hero.slide-light {
  background: var(--brand-blue-bg) !important;
}
.hero.slide-light .hero-grid::after {
  background: linear-gradient(
    90deg,
    rgba(247, 252, 254, 0.78) 0%,
    rgba(238, 249, 253, 0.44) 48%,
    rgba(238, 249, 253, 0.08) 100%
  );
}
.hero.slide-light h1 {
  color: #172033 !important;
}
.hero.slide-light .hero-copy > .eyebrow {
  color: var(--brand-blue);
}
.hero.slide-light .hero-copy-slide > p {
  color: #334155;
}
.hero.slide-light .hero-actions .primary-button {
  border-color: var(--brand-blue) !important;
  color: var(--brand-blue) !important;
}
.hero.slide-light .hero-actions .primary-button:hover {
  background: var(--brand-blue-bg) !important;
  color: var(--brand-blue) !important;
}
.hero.slide-light .slider-dots button {
  background: #94a3b8 !important;
}
.hero.slide-light .slider-dots button.active {
  background: var(--brand-blue-bg) !important;
}
.product-showcase {
  padding: 118px 0 132px;
  background: #fff;
}
.product-showcase h2 {
  margin: 0 0 132px;
  color: #172033;
  font-size: 48px;
  line-height: 1;
  text-align: center;
}
.product-tabs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border: 1px solid #d7e0e8;
  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.08);
}
.product-tab {
  min-height: 176px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  border-right: 1px solid #d7e0e8;
  background: #fff;
  color: #061d37;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}
.product-tab:last-child {
  border-right: 0;
}
.product-tab strong {
  font-size: 19px;
  line-height: 1.35;
}
.product-tab span {
  color: var(--brand-blue);
  font-size: 14px;
  font-weight: 700;
}
.product-tab:hover,
.product-tab:focus-visible {
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  outline: 0;
}
.product-tab:hover span,
.product-tab:focus-visible span {
  color: var(--brand-blue);
}
@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
@media (max-width: 900px) {
  .hero {
    min-height: 560px;
  }
  .hero-grid {
    min-height: 560px;
    padding: 172px 0 50px !important;
  }
  .hero h1 {
    font-size: 40px !important;
  }
  .product-showcase {
    padding: 82px 0;
  }
  .product-showcase h2 {
    margin-bottom: 64px;
    font-size: 40px;
  }
  .product-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .product-tab:nth-child(2n) {
    border-right: 0;
  }
  .product-tab:not(:last-child) {
    border-bottom: 1px solid #d7e0e8;
  }
}
@media (max-width: 560px) {
  .home-shell {
    width: min(100% - 32px, 1180px);
  }
  .hero {
    min-height: 470px;
  }
  .hero-grid {
    min-height: 470px;
    padding-top: 150px !important;
  }
  .hero h1 {
    font-size: 34px !important;
  }
  .hero-copy-slide > p {
    font-size: 16px;
  }
  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
  .slider-row {
    bottom: 16px;
  }
  .product-showcase h2 {
    font-size: 34px;
  }
  .product-tabs {
    grid-template-columns: 1fr;
  }
  .product-tab,
  .product-tab:nth-child(2n) {
    border-right: 0;
    border-bottom: 1px solid #d7e0e8;
  }
  .product-tab:last-child {
    border-bottom: 0;
  }
  .product-card {
    min-height: 206px;
  }
}
</style>
