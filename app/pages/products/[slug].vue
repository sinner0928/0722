<script setup lang="ts">
const route = useRoute()
const products = {
  'ble-transparent-chip': {
    name: '低功耗蓝牙透传芯片',
    category: '蓝牙芯片',
    image: '/assets/6.jpg',
    summary: '面向稳定连接与低时延通信场景，提供可靠的低功耗蓝牙透传能力。',
    overview:
      '低功耗蓝牙透传芯片适用于需要快速建立无线数据链路的产品，兼顾连接稳定性、功耗控制与开发集成效率。',
    specs: [
      ['无线协议', 'Bluetooth Low Energy'],
      ['核心能力', '低功耗透传、稳定连接'],
      ['典型应用', '智能硬件、传感器、控制设备'],
    ],
    uses: ['低时延数据交互', '设备状态上报', '轻量级无线控制'],
  },
  'ble-soc': {
    name: '低功耗蓝牙 SoC',
    category: '蓝牙芯片',
    image: '/assets/4.jpg',
    summary: '适合消费电子、外设与控制类设备的高集成度蓝牙 SoC。',
    overview: '集成无线连接与嵌入式处理能力，为产品提供更灵活的软硬件开发空间。',
    specs: [
      ['无线协议', 'Bluetooth Low Energy'],
      ['集成能力', '射频与嵌入式控制'],
      ['典型应用', '外设、遥控、智能家居'],
    ],
    uses: ['消费电子外设', '智能控制终端', '无线传感设备'],
  },
  'audio-soc': {
    name: '双模音频透传 SoC',
    category: '音频与连接',
    image: '/assets/5.jpg',
    summary: '兼顾多协议融合与产品定制需求的双模音频连接方案。',
    overview: '面向音频数据和控制数据并行传输场景，支持产品在性能、功耗和交互体验间取得平衡。',
    specs: [
      ['连接模式', '双模无线连接'],
      ['核心能力', '音频与数据透传'],
      ['典型应用', '音频设备、无线配件'],
    ],
    uses: ['音频数据传输', '设备控制', '产品定制开发'],
  },
  'nfc-reader': {
    name: 'NFC 读卡器芯片',
    category: 'NFC',
    image: '/assets/3.jpg',
    summary: '面向读卡、识别与快速集成需求的 NFC 读卡器芯片。',
    overview: '为身份识别、近场读卡及设备交互提供稳定的基础能力，缩短产品集成周期。',
    specs: [
      ['工作能力', 'NFC 读卡与识别'],
      ['核心能力', '快速集成、稳定通信'],
      ['典型应用', '门禁、识别终端、智能设备'],
    ],
    uses: ['身份识别', '近场交互', '设备配对'],
  },
  'bluetooth-module': {
    name: '蓝牙模组',
    category: '无线模组',
    image: '/assets/2.jpg',
    summary: '用于快速集成与规模化交付的蓝牙无线模组。',
    overview: '预集成硬件与射频设计，帮助研发团队降低无线设计门槛并加快产品验证。',
    specs: [
      ['连接能力', '蓝牙无线通信'],
      ['交付形式', '模组化集成'],
      ['典型应用', '智能硬件、物联网终端'],
    ],
    uses: ['快速原型验证', '量产产品集成', '无线功能扩展'],
  },
} as const
const product = computed(() => products[route.params.slug as keyof typeof products])
if (!product.value) throw createError({ statusCode: 404, statusMessage: '未找到产品' })
useSeoMeta({
  title: () => `${product.value?.name} | 壹原理`,
  description: () => product.value?.summary,
})
</script>

<template>
  <main class="detail-page">
    <nav class="detail-breadcrumb" aria-label="breadcrumb">
      <NuxtLink to="/">首页</NuxtLink>
      <span>›</span>
      <NuxtLink to="/#products">产品</NuxtLink>
      <span>›</span>
      <strong>{{ product?.name }}</strong>
    </nav>

    <section class="detail-hero">
      <div class="detail-hero__inner">
        <div class="detail-hero__copy">
          <p>{{ product?.category }}</p>
          <h1>{{ product?.name }}</h1>
          <p>{{ product?.summary }}</p>
        </div>
        <img :src="product?.image" :alt="product?.name" />
      </div>
    </section>

    <nav class="detail-tabs" aria-label="产品详情导航">
      <a href="#overview">产品简介</a>
      <a href="#specs">参数规格</a>
      <a href="#resources">软件及资料</a>
    </nav>
    <section id="overview">
      <h2>产品简介</h2>
      <p>{{ product?.overview }}</p>
    </section>
    <section id="specs" class="muted">
      <h2>参数规格</h2>
      <dl>
        <template v-for="item in product?.specs" :key="item[0]"
          ><dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd></template
        >
      </dl>
    </section>
    <section id="resources">
      <h2>软件及资料</h2>
      <ul>
        <li v-for="item in product?.uses" :key="item">{{ item }}</li>
      </ul>
      <a class="cta" href="/#contact">获取软件及资料</a>
    </section>
  </main>
</template>
