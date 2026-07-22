<script setup lang="ts">
import { companyStats, labels } from '~/data/site'

const { locale, pick } = useSiteLocale()
</script>

<template>
  <section id="company" class="company-section">
    <div class="shell company-section__inner">
      <header class="company-section__header">
        <h2>{{ pick(labels.company) }}</h2>
        <p>
          {{
            locale === 'zh'
              ? '壹原理科技专注低功耗蓝牙、SoC、NFC 与行业解决方案，提供芯片、模组、技术支持和产品选型服务。'
              : 'YiYuanLi focuses on BLE, SoC, NFC and industry solutions, providing chips, ' +
                'modules, technical support and product selection service.'
          }}
        </p>
      </header>

      <dl class="company-section__stats">
        <div v-for="stat in companyStats" :key="stat.value">
          <dt>{{ stat.value }}</dt>
          <dd>{{ pick(stat.label) }}</dd>
        </div>
      </dl>

      <NuxtLink class="company-section__cta" to="/company">
        {{ locale === 'zh' ? '了解公司' : 'Learn About Us' }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.company-section {
  padding: 104px 0 96px;
  border-top: 1px solid #d9e1ea;
  background: var(--brand-blue-bg);
  color: #46566a;
}

.company-section__inner {
  display: grid;
  justify-items: center;
}

.company-section__header {
  max-width: 760px;
  margin: 0 auto 62px;
  text-align: center;
}

.company-section__header h2 {
  margin: 0;
  color: #061d37;
  font-size: 48px;
  line-height: 1.2;
}

.company-section__header > p:not(.eyebrow) {
  margin: 20px auto 0;
  font-size: 17px;
  line-height: 1.75;
}

.company-section__stats {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin: 0;
}

.company-section__stats div {
  min-height: 156px;
  display: grid;
  align-content: start;
  padding: 28px;
  background: #fff;
  border: 1px solid #d9e1ea;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    transform 180ms ease;
}

.company-section__stats div:hover {
  border-color: var(--brand-blue);
  background: var(--brand-blue-bg);
  transform: translateY(-4px);
}

.company-section__stats dt {
  color: #061d37;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.15;
}

.company-section__stats dd {
  margin: 12px 0 0;
  color: #607089;
  font-size: 14px;
  line-height: 1.5;
}

.company-section__cta {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 34px;
  padding: 0 24px;
  border: 1px solid var(--brand-blue);
  border-radius: 6px;
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  font-weight: 700;
  transition:
    background-color 180ms ease,
    border-color 180ms ease;
}

.company-section__cta:hover,
.company-section__cta:focus-visible {
  border-color: var(--brand-blue);
  background: var(--brand-blue-bg);
  outline: none;
}

@media (max-width: 900px) {
  .company-section {
    padding: 76px 0;
  }

  .company-section__header {
    margin-bottom: 46px;
  }

  .company-section__header h2 {
    font-size: 40px;
  }

  .company-section__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .company-section {
    padding: 58px 0;
  }

  .company-section__header {
    margin-bottom: 34px;
    text-align: left;
  }

  .company-section__header h2 {
    font-size: 32px;
  }

  .company-section__header > p:not(.eyebrow) {
    font-size: 16px;
  }

  .company-section__stats {
    grid-template-columns: 1fr;
  }

  .company-section__stats div {
    min-height: 124px;
    padding: 20px;
  }

  .company-section__cta {
    width: 100%;
  }
}
</style>
