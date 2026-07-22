<script setup lang="ts">
import { labels, products, solutions, supportSections } from '~/data/site'

const { locale, pick } = useSiteLocale()
const route = useRoute()
const contactHref = computed(() => (route.path === '/' ? '#contact' : '/#contact'))
</script>

<template>
  <footer id="about" class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <img src="/assets/company-logo-wide.png" :alt="pick(labels.brand)" />
        <p>
          {{
            locale === 'zh'
              ? '面向智能硬件与物联网领域，提供射频技术与嵌入式解决方案。'
              : 'RF technology and embedded solutions for smart hardware and IoT.'
          }}
        </p>
      </div>

      <nav
        class="site-footer__links"
        :aria-label="locale === 'zh' ? '页脚导航' : 'Footer navigation'"
      >
        <section>
          <h2>{{ pick(labels.products) }}</h2>
          <NuxtLink v-for="item in products" :key="item.slug" :to="`/products/${item.slug}`">{{
            pick(item.name)
          }}</NuxtLink>
        </section>
        <section>
          <h2>{{ pick(labels.solutions) }}</h2>
          <NuxtLink v-for="item in solutions" :key="item.slug" :to="`/solutions/${item.slug}`">{{
            pick(item.name)
          }}</NuxtLink>
        </section>
        <section>
          <h2>{{ locale === 'zh' ? '服务与支持' : 'Service & Support' }}</h2>
          <NuxtLink
            v-for="item in supportSections.slice(0, 3)"
            :key="item.slug"
            :to="`/support/${item.slug}`"
            >{{ pick(item.title) }}</NuxtLink
          >
        </section>
        <section>
          <h2>{{ pick(labels.company) }}</h2>
          <NuxtLink to="/company">{{ locale === 'zh' ? '公司介绍' : 'Company Profile' }}</NuxtLink>
          <a :href="contactHref">{{ locale === 'zh' ? '联系销售' : 'Contact Sales' }}</a>
        </section>
        <section>
          <h2>{{ locale === 'zh' ? '合作咨询' : 'Business Inquiry' }}</h2>
          <a :href="contactHref">{{ locale === 'zh' ? '销售咨询' : 'Sales Consultation' }}</a>
          <a :href="contactHref">{{ locale === 'zh' ? '技术支持' : 'Technical Support' }}</a>
          <a :href="contactHref">{{ locale === 'zh' ? '样品申请' : 'Sample Request' }}</a>
        </section>
      </nav>

      <div class="site-footer__bottom">
        <span>Copyright 2026 {{ pick(labels.brand) }}</span>
        <a href="#top">{{ locale === 'zh' ? '返回顶部' : 'Back to top' }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #10212c;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Microsoft YaHei', 'Source Sans 3', Arial, sans-serif;
}

.site-footer__inner {
  display: grid;
  max-width: 1320px;
  grid-template-columns: minmax(220px, 0.9fr) minmax(0, 2.1fr);
  gap: 64px;
  margin: 0 auto;
  padding: 52px 48px 28px;
  box-sizing: border-box;
}

.site-footer__brand img {
  display: block;
  width: auto;
  height: 30px;
}

.site-footer__brand p {
  max-width: 280px;
  margin: 18px 0 0;
  line-height: 1.75;
}

.site-footer__links {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px;
}

.site-footer__links section {
  display: grid;
  align-content: start;
  gap: 10px;
}

.site-footer__links h2 {
  margin: 0 0 8px;
  color: #fff;
  font-size: 16px;
  line-height: 1.3;
}

.site-footer__links a,
.site-footer__bottom a {
  width: fit-content;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.55;
  transition: color 180ms ease;
}

.site-footer__links a:hover,
.site-footer__links a:focus-visible,
.site-footer__bottom a:hover,
.site-footer__bottom a:focus-visible {
  color: #fff;
  outline: none;
  text-decoration: underline;
}

.site-footer__bottom {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.58);
  font-size: 13px;
}

@media (max-width: 760px) {
  .site-footer__inner {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 40px 20px 24px;
  }

  .site-footer__brand p {
    max-width: 420px;
  }

  .site-footer__links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 20px;
  }

  .site-footer__bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
