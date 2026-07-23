<script setup lang="ts">
const { locale } = useSiteLocale()
const submitted = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const form = reactive({ name: '', email: '', phone: '', country: '', city: '' })

const copy = computed(() =>
  locale.value === 'zh'
    ? {
        title: '\u8054\u7cfb\u6211\u4eec',
        intro: '\u63d0\u4ea4\u9700\u6c42\u540e\uff0c\u6211\u4eec\u4f1a\u6839\u636e\u4ea7\u54c1\u65b9\u5411\u3001\u9879\u76ee\u9636\u6bb5\u548c\u4ea4\u4ed8\u76ee\u6807\u5b89\u6392\u8ddf\u8fdb\u3002',
        routesLabel: '\u54a8\u8be2\u7c7b\u578b',
        routes: [
          ['\u9500\u552e\u54a8\u8be2', '\u4ea7\u54c1\u9009\u578b\u3001\u6279\u91cf\u4f9b\u8d27\u548c\u5546\u52a1\u5408\u4f5c\u3002'],
          ['\u6280\u672f\u652f\u6301', '\u534f\u8bae\u6808\u5b9a\u5236\u3001\u56fa\u4ef6\u8c03\u8bd5\u548c\u53c2\u8003\u65b9\u6848\u54a8\u8be2\u3002'],
          ['\u6837\u54c1\u7533\u8bf7', '\u6837\u54c1\u3001\u8bc4\u4f30\u677f\u548c\u8d44\u6599\u7533\u8bf7\u3002'],
        ],
        name: '\u59d3\u540d',
        email: '\u90ae\u7bb1',
        phone: '\u7535\u8bdd',
        country: '\u56fd\u5bb6',
        city: '\u57ce\u5e02',
        submit: '\u63d0\u4ea4\u9700\u6c42',
        submitting: '\u63d0\u4ea4\u4e2d...',
        success: '\u63d0\u4ea4\u6210\u529f\uff0c\u6211\u4eec\u5df2\u6536\u5230\u60a8\u7684\u8054\u7cfb\u65b9\u5f0f\u3002',
        error: '\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u586b\u5199\u5185\u5bb9\u540e\u91cd\u8bd5\u3002',
      }
    : {
        title: 'Contact Us',
        intro: 'Submit your requirements and our team will follow up based on your product direction and project stage.',
        routesLabel: 'Consultation types',
        routes: [
          ['Sales Consultation', 'Product selection, supply planning and business cooperation.'],
          ['Technical Support', 'Protocol customization, firmware debugging and reference design advice.'],
          ['Sample Request', 'Samples, evaluation boards and technical material requests.'],
        ],
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        country: 'Country',
        city: 'City',
        submit: 'Submit Request',
        submitting: 'Submitting...',
        success: 'Submitted successfully. We have received your contact details.',
        error: 'The request could not be submitted. Please check the form and try again.',
      },
)

const submitForm = async () => {
  submitted.value = false
  errorMessage.value = ''
  submitting.value = true

  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    submitted.value = true
    form.name = ''
    form.email = ''
    form.phone = ''
    form.country = ''
    form.city = ''
  } catch {
    errorMessage.value = copy.value.error
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="contact-section">
    <header class="contact-section__header">
      <h2>{{ copy.title }}</h2>
      <p>{{ copy.intro }}</p>
    </header>

    <div class="contact-section__grid">
      <div class="contact-section__intro" :aria-label="copy.routesLabel">
        <div class="contact-section__routes">
          <article v-for="route in copy.routes" :key="route[0]" class="contact-section__route">
            <h3>{{ route[0] }}</h3>
            <p>{{ route[1] }}</p>
          </article>
        </div>
      </div>

      <form class="contact-section__form" @submit.prevent="submitForm">
        <label for="contact-name">{{ copy.name }}</label>
        <input id="contact-name" v-model="form.name" required name="name" type="text" autocomplete="name" />

        <label for="contact-email">{{ copy.email }}</label>
        <input id="contact-email" v-model="form.email" required name="email" type="email" autocomplete="email" />

        <label for="contact-phone">{{ copy.phone }}</label>
        <input id="contact-phone" v-model="form.phone" required name="phone" type="tel" autocomplete="tel" />

        <label for="contact-country">{{ copy.country }}</label>
        <input id="contact-country" v-model="form.country" required name="country" type="text" autocomplete="country-name" />

        <label for="contact-city">{{ copy.city }}</label>
        <input id="contact-city" v-model="form.city" required name="city" type="text" autocomplete="address-level2" />

        <button class="contact-section__submit" type="submit" :disabled="submitting">
          {{ submitting ? copy.submitting : copy.submit }}
        </button>
        <p v-if="submitted" class="contact-section__success" role="status">{{ copy.success }}</p>
        <p v-if="errorMessage" class="contact-section__error" role="alert">{{ errorMessage }}</p>
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

.contact-section__intro,
.contact-section__form {
  min-width: 0;
}

.contact-section__routes,
.contact-section__form {
  display: grid;
  gap: 10px;
}

.contact-section__routes {
  gap: 14px;
}

.contact-section__route {
  border: 1px solid #d9e1ea;
  border-radius: 8px;
  padding: 22px;
  background: #fff;
  transition: border-color 180ms ease, background-color 180ms ease;
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
  padding: 0;
  border: 0;
  background: transparent;
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
  margin-top: 6px;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 0 18px;
  background: var(--brand-blue-bg);
  color: var(--brand-blue);
  font-weight: 700;
  cursor: pointer;
}

.contact-section__submit:disabled {
  cursor: wait;
  opacity: 0.65;
}

.contact-section__success,
.contact-section__error {
  margin: -2px 0 0;
  font-size: 13px;
  line-height: 1.5;
}

.contact-section__success { color: #5e6874; }
.contact-section__error { color: #b42318; }

@media (max-width: 1180px) {
  .contact-section__grid { grid-template-columns: 1fr; gap: 48px; }
}

@media (max-width: 760px) {
  .contact-section { padding-right: 20px; padding-left: 20px; }
  .contact-section__header { margin-bottom: 52px; }
  .contact-section__header h2 { font-size: 38px; }
}
</style>
