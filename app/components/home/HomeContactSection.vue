<script setup lang="ts">
const { locale } = useSiteLocale()
const submitted = ref(false)

const contactRoutes = computed(() => [
  {
    title: locale.value === 'zh' ? '销售咨询' : 'Sales Consultation',
    description:
      locale.value === 'zh'
        ? '产品选型、批量供货和商务合作。'
        : 'Product selection, supply planning and business cooperation.',
  },
  {
    title: locale.value === 'zh' ? '技术支持' : 'Technical Support',
    description:
      locale.value === 'zh'
        ? '协议栈定制、固件调试和参考方案咨询。'
        : 'Protocol customization, firmware debugging and reference design advice.',
  },
  {
    title: locale.value === 'zh' ? '样品申请' : 'Sample Request',
    description:
      locale.value === 'zh'
        ? '样品、评估板和资料申请流程预留。'
        : 'Reserved flow for samples, evaluation boards and technical materials.',
  },
])
</script>

<template>
  <section id="contact" class="contact-section">
    <header class="contact-section__header">
      <h2>{{ locale === 'zh' ? '联系我们' : 'Contact Us' }}</h2>
      <p>
        {{
          locale === 'zh'
            ? '提交需求后，我们将根据产品方向、项目阶段和交付目标安排销售或技术支持跟进。'
            : 'After you submit, our sales or technical team will follow up based on product ' +
              'direction, project stage and delivery goals.'
        }}
      </p>
    </header>

    <div class="contact-section__grid">
      <div
        class="contact-section__intro"
        :aria-label="locale === 'zh' ? '咨询类型' : 'Consultation types'"
      >
        <div class="contact-section__routes">
          <article v-for="route in contactRoutes" :key="route.title" class="contact-section__route">
            <h3>{{ route.title }}</h3>
            <p>{{ route.description }}</p>
          </article>
        </div>
      </div>

      <form class="contact-section__form" @submit.prevent="submitted = true">
        <label for="contact-name">{{ locale === 'zh' ? '姓名' : 'Name' }}</label>
        <input id="contact-name" required name="name" type="text" autocomplete="name" />

        <label for="contact-email">{{ locale === 'zh' ? '邮箱' : 'Email' }}</label>
        <input id="contact-email" required name="email" type="email" autocomplete="email" />

        <label for="contact-phone">{{ locale === 'zh' ? '电话' : 'Phone' }}</label>
        <input id="contact-phone" name="phone" type="tel" autocomplete="tel" />

        <label for="contact-country">{{ locale === 'zh' ? '国家' : 'Country' }}</label>
        <input id="contact-country" name="country" type="text" autocomplete="country-name" />

        <label for="contact-city">{{ locale === 'zh' ? '城市' : 'City' }}</label>
        <input id="contact-city" name="city" type="text" autocomplete="address-level2" />

        <button class="contact-section__submit" type="submit">
          {{ locale === 'zh' ? '提交需求' : 'Submit Request' }}
        </button>
        <p v-if="submitted" class="contact-section__success" role="status">
          {{
            locale === 'zh'
              ? '已记录本次演示提交，正式接口接入后将发送至对应团队。'
              : 'This demo submission is recorded locally; a backend can route it to the appropriate team later.'
          }}
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  width: 100vw;
  max-width: none;
  margin-left: calc(50% - 50vw);
  border-top: 1px solid #d9e1ea;
  padding: 104px max(48px, calc((100vw - 1320px) / 2 + 48px)) 88px;
  background: #fff;
  box-sizing: border-box;
  color: #16202b;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', Arial, sans-serif;
  line-height: 1.6;
}

.contact-section__header {
  margin-bottom: 72px;
  text-align: center;
}

.contact-section__header h2 {
  margin: 0;
  font-size: 48px;
  line-height: 1.2;
}

.contact-section__header p {
  margin: 18px 0 0;
  color: #5e6874;
  line-height: 1.7;
}

.contact-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}

.contact-section__intro {
  min-width: 0;
}

.contact-section__routes {
  display: grid;
  gap: 14px;
}

.contact-section__route {
  border: 1px solid #d9e1ea;
  border-radius: 8px;
  padding: 22px;
  background: #fff;
  transition:
    border-color 180ms ease,
    background-color 180ms ease;
}

.contact-section__route:hover {
  border-color: var(--brand-blue);
  background: var(--brand-blue-bg);
}

.contact-section__route h3 {
  margin: 0;
  font-size: 20px;
}

.contact-section__route p {
  margin: 14px 0 0;
  color: #5e6874;
}

.contact-section__form {
  display: grid;
  gap: 10px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.contact-section__form label {
  margin-top: 4px;
  color: #16202b;
  font-size: 14px;
  font-weight: 600;
}

.contact-section__form input {
  width: 100%;
  min-height: 48px;
  border: 1px solid #d9e1ea;
  border-radius: 6px;
  padding: 10px 14px;
  background: var(--brand-blue-bg);
  box-sizing: border-box;
  color: #16202b;
  outline: none;
}

.contact-section__form input:focus {
  border-color: var(--brand-blue);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(var(--brand-blue-rgb), 0.12);
}

.contact-section__submit {
  width: 100%;
  min-height: 44px;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 0 18px;
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  font-weight: 700;
  cursor: pointer;
}

.contact-section__submit:hover {
  background: var(--brand-blue-bg);
}

.contact-section__success {
  margin: -2px 0 0;
  color: #5e6874;
  font-size: 13px;
  line-height: 1.5;
}

@media (max-width: 1180px) {
  .contact-section__grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

@media (max-width: 760px) {
  .contact-section {
    padding-right: 20px;
    padding-left: 20px;
  }

  .contact-section__header {
    margin-bottom: 52px;
  }

  .contact-section__header h2 {
    font-size: 38px;
  }
}
</style>
