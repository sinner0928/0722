<script setup lang="ts">
import { labels, solutions } from '~/data/site'

const { locale, pick } = useSiteLocale()
const activePage = ref(1)
const activeCard = ref<string | null>(null)
const supportsHover = ref(false)
const touchStartX = ref<number | null>(null)
const isMoving = ref(false)
const skipTransition = ref(false)

const solutionPages = [solutions.slice(0, 3), solutions.slice(1, 4), solutions.slice(2, 5)]
const trackPages = [solutionPages[2], ...solutionPages, solutionPages[0]]
const activeStart = computed(() =>
  activePage.value === 0 ? 2 : activePage.value === 4 ? 0 : activePage.value - 1,
)
const trackStyle = computed(() => ({ transform: `translateX(-${activePage.value * 20}%)` }))

const move = (direction: -1 | 1) => {
  if (isMoving.value) return
  activeCard.value = null
  isMoving.value = true
  activePage.value += direction
}

const goTo = (index: number) => {
  if (isMoving.value || activeStart.value === index) return
  activeCard.value = null
  isMoving.value = true
  activePage.value = index + 1
}

const resetLoopPage = async () => {
  if (activePage.value !== 0 && activePage.value !== 4) return
  skipTransition.value = true
  activePage.value = activePage.value === 0 ? 3 : 1
  await nextTick()
  requestAnimationFrame(() => {
    skipTransition.value = false
  })
}

const onTrackTransitionEnd = async (event: TransitionEvent) => {
  if (event.propertyName !== 'transform') return
  isMoving.value = false
  await resetLoopPage()
}

const onCardClick = (event: MouseEvent, slug: string) => {
  if (supportsHover.value || activeCard.value === slug) return
  event.preventDefault()
  activeCard.value = slug
}

const onTouchEnd = (event: TouchEvent) => {
  if (touchStartX.value === null) return
  const difference = event.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(difference) > 40) move(difference < 0 ? 1 : -1)
  touchStartX.value = null
}

onMounted(() => {
  supportsHover.value = window.matchMedia('(hover: hover)').matches
})
</script>

<template>
  <section id="solutions" class="solution-carousel">
    <div class="home-shell">
      <h2>{{ pick(labels.solutions) }}</h2>

      <div
        class="solution-carousel__viewport"
        @touchstart.passive="touchStartX = $event.touches[0]?.clientX ?? null"
        @touchend="onTouchEnd"
      >
        <div
          class="solution-carousel__track"
          :class="{ 'skip-transition': skipTransition }"
          :style="trackStyle"
          @transitionend="onTrackTransitionEnd"
        >
          <div
            v-for="(page, pageIndex) in trackPages"
            :key="pageIndex"
            class="solution-carousel__page"
          >
            <NuxtLink
              v-for="solution in page"
              :key="`${pageIndex}-${solution.slug}`"
              :to="`/solutions/${solution.slug}`"
              class="solution-carousel__card"
              :class="{ 'is-expanded': activeCard === solution.slug }"
              @mouseenter="supportsHover && (activeCard = solution.slug)"
              @mouseleave="supportsHover && (activeCard = null)"
              @focus="activeCard = solution.slug"
              @blur="activeCard = null"
              @click="onCardClick($event, solution.slug)"
            >
              <img :src="solution.image" :alt="pick(solution.name)" />
              <div class="solution-carousel__caption">
                <strong>{{ pick(solution.name) }}</strong>
                <p>{{ pick(solution.summary) }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div
        class="solution-carousel__controls"
        :aria-label="locale === 'zh' ? '解决方案轮播控制' : 'Solution carousel controls'"
      >
        <button
          type="button"
          :aria-label="locale === 'zh' ? '上一组' : 'Previous'"
          @click="move(-1)"
        >
          ←
        </button>
        <div class="solution-carousel__dots">
          <button
            v-for="index in solutionPages.length"
            :key="index"
            type="button"
            :class="{ active: activeStart === index - 1 }"
            :aria-label="`${index}`"
            @click="goTo(index - 1)"
          />
        </div>
        <button type="button" :aria-label="locale === 'zh' ? '下一组' : 'Next'" @click="move(1)">
          →
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution-carousel {
  padding: 118px 0 96px;
  background: var(--brand-blue-bg);
}
.solution-carousel h2 {
  margin: 0 0 70px;
  color: #061d37;
  font-size: 48px;
  line-height: 1;
  text-align: center;
}
.solution-carousel__viewport {
  overflow: hidden;
}
.solution-carousel__track {
  display: flex;
  width: 500%;
  transition: transform 900ms cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}
.solution-carousel__track.skip-transition {
  transition: none;
}
.solution-carousel__page {
  width: 20%;
  flex: 0 0 20%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.solution-carousel__card {
  position: relative;
  display: block;
  min-width: 0;
  aspect-ratio: 1.03;
  overflow: hidden;
  background: #06121c;
  color: #fff;
}
.solution-carousel__card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.solution-carousel__caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 70px;
  padding: 21px 18px;
  display: grid;
  align-content: end;
  background: rgba(3, 13, 20, 0.82);
  transition:
    min-height 0.5s ease,
    background 0.5s ease;
}
.solution-carousel__caption strong {
  font-size: 18px;
  line-height: 1.35;
}
.solution-carousel__caption p {
  max-height: 0;
  margin: 0;
  overflow: hidden;
  color: #d9e5eb;
  font-size: 15px;
  line-height: 1.5;
  opacity: 0;
  transition:
    max-height 0.5s ease,
    margin-top 0.5s ease,
    opacity 0.35s ease;
}
.solution-carousel__card.is-expanded img,
.solution-carousel__card:hover img {
  transform: scale(1.025);
}
.solution-carousel__card.is-expanded .solution-carousel__caption,
.solution-carousel__card:hover .solution-carousel__caption {
  min-height: 104px;
  background: rgba(3, 13, 20, 0.88);
}
.solution-carousel__card.is-expanded .solution-carousel__caption p,
.solution-carousel__card:hover .solution-carousel__caption p {
  max-height: 50px;
  margin-top: 5px;
  opacity: 1;
}
.solution-carousel__card:focus-visible {
  outline: 3px solid var(--brand-blue);
  outline-offset: 3px;
}
.solution-carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}
.solution-carousel__controls > button {
  width: 34px;
  height: 34px;
  border: 1px solid #d6e0eb;
  border-radius: 50%;
  background: #fff;
  color: #061d37;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}
.solution-carousel__controls > button:hover {
  border-color: var(--brand-blue);
  color: var(--brand-blue);
}
.solution-carousel__dots {
  display: flex;
  align-items: center;
  gap: 8px;
}
.solution-carousel__dots button {
  width: 9px;
  height: 9px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #d7e0eb;
  cursor: pointer;
}
.solution-carousel__dots button.active {
  width: 25px;
  background: var(--brand-blue-bg);
  border: 1px solid var(--brand-blue);
}
@media (max-width: 900px) {
  .solution-carousel {
    padding: 82px 0;
  }
  .solution-carousel h2 {
    margin-bottom: 48px;
    font-size: 40px;
  }
  .solution-carousel__page {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .solution-carousel__card:nth-child(3) {
    display: none;
  }
}
@media (max-width: 560px) {
  .solution-carousel h2 {
    font-size: 34px;
  }
  .solution-carousel__page {
    grid-template-columns: 1fr;
  }
  .solution-carousel__card:nth-child(n + 2) {
    display: none;
  }
  .solution-carousel__card {
    aspect-ratio: 1.1;
  }
}
</style>
