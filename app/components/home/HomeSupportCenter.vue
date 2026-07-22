<script setup lang="ts">
import { BookOpenText, CircleQuestionMark, Cpu, MessagesSquare, Wrench } from 'lucide-vue-next'
import { labels, supportSections } from '~/data/site'

const { pick } = useSiteLocale()

const supportIcons = {
  sdk: Cpu,
  tools: Wrench,
  documents: BookOpenText,
  forum: MessagesSquare,
  faq: CircleQuestionMark,
} as const
</script>

<template>
  <section id="support" class="support-center" :aria-label="pick(labels.support)">
    <header class="support-center__hero">
      <h2>{{ pick(labels.support) }}</h2>
    </header>

    <div class="support-center__body">
      <nav class="support-center__links shell" :aria-label="pick(labels.support)">
        <NuxtLink
          v-for="item in supportSections"
          :key="item.slug"
          :to="`/support/${item.slug}`"
          class="support-center__link"
        >
          <component
            :is="supportIcons[item.slug]"
            class="support-center__icon"
            :size="56"
            :stroke-width="1.8"
            aria-hidden="true"
          />
          <strong>{{ pick(item.title) }}</strong>
        </NuxtLink>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.support-center {
  background: #fff;
}

.support-center__hero {
  min-height: 300px;
  display: grid;
  place-items: center;
  padding: 48px 20px;
  background: var(--brand-blue-bg) url('/assets/support-tools-banner.png') center / cover no-repeat;
}

.support-center__hero h2 {
  margin: 0;
  color: #fff;
  font-size: 52px;
  font-weight: 800;
  line-height: 1.2;
}

.support-center__body {
  min-height: 466px;
  display: grid;
  align-items: center;
  padding: 86px 0;
}

.support-center__links {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: start;
}

.support-center__link {
  min-height: 148px;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 36px;
  padding: 14px 12px;
  color: #374151;
  text-align: center;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.support-center__link strong {
  color: #071b37;
  font-size: 20px;
  line-height: 1.35;
}

.support-center__icon {
  color: #334155;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.support-center__link:hover,
.support-center__link:focus-visible {
  color: var(--brand-blue);
  transform: translateY(-5px);
}

.support-center__link:hover .support-center__icon,
.support-center__link:focus-visible .support-center__icon {
  color: var(--brand-blue);
  transform: scale(1.04);
}

.support-center__link:focus-visible {
  outline: 2px solid var(--brand-blue);
  outline-offset: 5px;
}

@media (max-width: 900px) {
  .support-center__hero {
    min-height: 240px;
  }

  .support-center__hero h2 {
    font-size: 42px;
  }

  .support-center__body {
    min-height: 0;
    padding: 66px 0;
  }

  .support-center__links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 42px;
  }
}

@media (max-width: 560px) {
  .support-center__hero {
    min-height: 190px;
  }

  .support-center__hero h2 {
    font-size: 34px;
  }

  .support-center__body {
    padding: 52px 0;
  }

  .support-center__links {
    grid-template-columns: 1fr;
    row-gap: 22px;
  }

  .support-center__link {
    min-height: auto;
    gap: 20px;
  }
}
</style>
