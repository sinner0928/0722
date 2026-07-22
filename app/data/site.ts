export type LocaleCode = 'zh' | 'en'
export type L10n = { zh: string; en: string }
export const t = (value: L10n, locale: LocaleCode) => value[locale]
export const l = (zh: string, en: string): L10n => ({ zh, en })

export const labels = {
  brand: l('壹原理', 'YiYuanLi'),
  home: l('首页', 'Home'),
  products: l('产品', 'Products'),
  solutions: l('解决方案', 'Solutions'),
  support: l('支持中心', 'Support'),
  company: l('关于公司', 'Company'),
  search: l('搜索', 'Search'),
  language: l('EN', '中文'),
  contactSales: l('联系销售', 'Contact Sales'),
  close: l('关闭', 'Close'),
  menu: l('菜单', 'Menu'),
}

export const products = [
  {
    slug: 'ble-transparent-chip',
    name: l('低功耗蓝牙透传芯片', 'Low-Power BLE Transparent Chip'),
    category: l('蓝牙芯片', 'Bluetooth Chip'),
    image: '/assets/6.jpg',
    summary: l(
      '面向稳定连接与低时延通信场景，提供可靠的低功耗蓝牙透传能力。',
      'Reliable low-power BLE transparent transmission for stable and low-latency connectivity.',
    ),
    overview: l(
      '适用于需要快速建立无线数据链路的产品，兼顾连接稳定性、功耗控制与开发集成效率。',
      'Designed for products that need a fast wireless data link while balancing stability, ' +
        'power and integration speed.',
    ),
    specs: [
      [l('无线协议', 'Protocol'), l('Bluetooth Low Energy', 'Bluetooth Low Energy')],
      [
        l('核心能力', 'Core Capability'),
        l('低功耗透传、稳定连接', 'Low-power transparent transmission, stable connection'),
      ],
      [
        l('典型应用', 'Applications'),
        l('智能硬件、传感器、控制设备', 'Smart hardware, sensors, control devices'),
      ],
    ],
    uses: [
      l('低时延数据交互', 'Low-latency data exchange'),
      l('设备状态上报', 'Device status reporting'),
      l('轻量级无线控制', 'Lightweight wireless control'),
    ],
    keywords: ['ble', 'transparent', 'chip', '蓝牙', '透传', '芯片'],
  },
  {
    slug: 'ble-soc',
    name: l('低功耗蓝牙 SoC', 'Low-Power BLE SoC'),
    category: l('蓝牙 SoC', 'Bluetooth SoC'),
    image: '/assets/4.jpg',
    summary: l(
      '适合消费电子、外设与控制类设备的高集成度蓝牙 SoC。',
      'Highly integrated BLE SoC for consumer electronics, peripherals and control devices.',
    ),
    overview: l(
      '集成无线连接与嵌入式处理能力，为产品提供更灵活的软硬件开发空间。',
      'Combines wireless connectivity and embedded processing to support flexible product development.',
    ),
    specs: [
      [l('无线协议', 'Protocol'), l('Bluetooth Low Energy', 'Bluetooth Low Energy')],
      [l('集成能力', 'Integration'), l('射频与嵌入式控制', 'RF and embedded control')],
      [
        l('典型应用', 'Applications'),
        l('外设、遥控、智能家居', 'Peripherals, remotes, smart home'),
      ],
    ],
    uses: [
      l('消费电子外设', 'Consumer peripherals'),
      l('智能控制终端', 'Smart control terminals'),
      l('无线传感设备', 'Wireless sensor devices'),
    ],
    keywords: ['ble', 'soc', 'peripheral', '蓝牙', '外设'],
  },
  {
    slug: 'audio-soc',
    name: l('双模音频透传 SoC', 'Dual-Mode Audio Transparent SoC'),
    category: l('音频与连接', 'Audio Connectivity'),
    image: '/assets/5.jpg',
    summary: l(
      '兼顾多协议融合与产品定制需求的双模音频连接方案。',
      'Dual-mode audio connectivity for multi-protocol and customized product needs.',
    ),
    overview: l(
      '面向音频数据和控制数据并行传输场景，支持产品在性能、功耗和交互体验间取得平衡。',
      'Supports parallel audio and control data transmission with balanced performance and power.',
    ),
    specs: [
      [l('连接模式', 'Connection Mode'), l('双模无线连接', 'Dual-mode wireless connectivity')],
      [
        l('核心能力', 'Core Capability'),
        l('音频与数据透传', 'Audio and data transparent transmission'),
      ],
      [
        l('典型应用', 'Applications'),
        l('音频设备、无线配件', 'Audio devices, wireless accessories'),
      ],
    ],
    uses: [
      l('音频数据传输', 'Audio data transmission'),
      l('设备控制', 'Device control'),
      l('产品定制开发', 'Custom product development'),
    ],
    keywords: ['audio', 'dual mode', 'soc', '音频', '双模'],
  },
  {
    slug: 'nfc-reader',
    name: l('NFC 读卡器芯片', 'NFC Reader Chip'),
    category: l('NFC', 'NFC'),
    image: '/assets/3.jpg',
    summary: l(
      '面向读卡、识别与快速集成需求的 NFC 读卡器芯片。',
      'NFC reader chip for card reading, identification and fast integration.',
    ),
    overview: l(
      '为身份识别、近场读卡及设备交互提供稳定的基础能力，缩短产品集成周期。',
      'Provides stable NFC reading and identification capabilities for faster product integration.',
    ),
    specs: [
      [l('工作能力', 'Capability'), l('NFC 读卡与识别', 'NFC reading and identification')],
      [
        l('核心能力', 'Core Capability'),
        l('快速集成、稳定通信', 'Fast integration, stable communication'),
      ],
      [
        l('典型应用', 'Applications'),
        l('门禁、识别终端、智能设备', 'Access control, ID terminals, smart devices'),
      ],
    ],
    uses: [
      l('身份识别', 'Identity recognition'),
      l('近场交互', 'Near-field interaction'),
      l('设备配对', 'Device pairing'),
    ],
    keywords: ['nfc', 'reader', 'card', '读卡', '识别'],
  },
  {
    slug: 'bluetooth-module',
    name: l('蓝牙模组', 'Bluetooth Module'),
    category: l('无线模组', 'Wireless Module'),
    image: '/assets/2.jpg',
    summary: l(
      '用于快速集成与规模化交付的蓝牙无线模组。',
      'Bluetooth wireless module for quick integration and scalable delivery.',
    ),
    overview: l(
      '预集成硬件与射频设计，帮助研发团队降低无线设计门槛并加快产品验证。',
      'Pre-integrated hardware and RF design help teams reduce wireless design effort and speed up validation.',
    ),
    specs: [
      [l('连接能力', 'Connectivity'), l('蓝牙无线通信', 'Bluetooth wireless communication')],
      [l('交付形式', 'Form Factor'), l('模组化集成', 'Modular integration')],
      [l('典型应用', 'Applications'), l('智能硬件、物联网终端', 'Smart hardware, IoT terminals')],
    ],
    uses: [
      l('快速原型验证', 'Rapid prototype validation'),
      l('量产产品集成', 'Mass-production integration'),
      l('无线功能扩展', 'Wireless feature extension'),
    ],
    keywords: ['bluetooth', 'module', 'iot', '蓝牙', '模组'],
  },
] as const

export const solutions = [
  {
    slug: 'keyboard-mouse',
    name: l('超低功耗多模键鼠', 'Ultra-Low-Power Multi-Mode Keyboard & Mouse'),
    image: '/assets/21.jpg',
    summary: l(
      '面向蓝牙无线办公鼠标、三模外设与电竞键鼠的连接方案。',
      'Connectivity solution for wireless office mouse, tri-mode peripherals and gaming input devices.',
    ),
    overview: l(
      '围绕输入设备低时延、长续航和跨设备切换需求，提供芯片、模组、SDK 与量产调试支持。',
      'Covers low latency, long battery life and device switching with chip, module, SDK and production support.',
    ),
    scenes: [
      l('办公外设', 'Office peripherals'),
      l('电竞键鼠', 'Gaming keyboard and mouse'),
      l('跨设备输入', 'Cross-device input'),
    ],
    features: [
      l('低时延输入链路', 'Low-latency input link'),
      l('多设备快速切换', 'Fast multi-device switching'),
      l('长续航量产支持', 'Long-battery production support'),
    ],
    products: ['ble-soc', 'bluetooth-module'],
    branches: [
      l('蓝牙办公鼠标', 'Bluetooth Office Mouse'),
      l('三模电竞外设', 'Tri-Mode Gaming Peripheral'),
    ],
    keywords: ['keyboard', 'mouse', '键鼠', '外设'],
  },
  {
    slug: 'photography',
    name: l('专业摄影全产业解决方案', 'Professional Photography Ecosystem Solution'),
    image: '/assets/22.jpg',
    summary: l(
      '为自拍、直播、跟拍和移动拍摄设备提供无线控制能力。',
      'Wireless control for selfie, live streaming, tracking and mobile shooting devices.',
    ),
    overview: l(
      '覆盖自拍遥控、拍摄控制器、跟拍摄像头和稳定器配件等产品方向。',
      'Covers selfie remotes, shooting controllers, tracking cameras and stabilizer accessories.',
    ),
    scenes: [
      l('自拍遥控器', 'Selfie remotes'),
      l('多功能控制器', 'Multi-function controllers'),
      l('跟拍摄像头', 'Tracking cameras'),
    ],
    features: [
      l('无线操控', 'Wireless control'),
      l('多设备兼容', 'Multi-device compatibility'),
      l('户外稳定连接', 'Stable outdoor connection'),
    ],
    products: ['ble-transparent-chip', 'audio-soc'],
    branches: [l('自拍遥控器', 'Selfie Remote'), l('跟拍控制器', 'Tracking Controller')],
    keywords: ['camera', 'photography', '摄影', '自拍'],
  },
  {
    slug: 'remote-control',
    name: l('超低功耗泛遥控器品类', 'Ultra-Low-Power Remote Control Category'),
    image: '/assets/23.jpg',
    summary: l(
      '覆盖电视、小家电、两轮车钥匙及多协议控制设备。',
      'For TV, small appliances, two-wheeler keys and multi-protocol control devices.',
    ),
    overview: l(
      '针对待机功耗、协议适配和快速定制需求，提供从芯片到参考方案的完整路径。',
      'A complete path from chips to reference designs for standby power, protocol adaptation and customization.',
    ),
    scenes: [
      l('电视遥控', 'TV remote'),
      l('小家电控制', 'Small appliance control'),
      l('两轮车钥匙', 'Two-wheeler key'),
    ],
    features: [
      l('多协议融合', 'Multi-protocol integration'),
      l('低功耗待机', 'Low standby power'),
      l('快速定制', 'Fast customization'),
    ],
    products: ['ble-soc', 'bluetooth-module'],
    keywords: ['remote', 'control', '遥控器'],
  },
  {
    slug: 'bluetooth-transfer',
    name: l('蓝牙透传', 'Bluetooth Transparent Transmission'),
    image: '/assets/24.jpg',
    summary: l(
      '面向快速数据交互、设备连接和轻量级定制需求。',
      'For fast data exchange, device connection and lightweight customization.',
    ),
    overview: l(
      '为传感器、控制器、采集设备等产品提供稳定的数据传输和应用层扩展能力。',
      'Stable data transmission and application-layer extension for sensors, controllers and data acquisition devices.',
    ),
    scenes: [
      l('数据采集', 'Data acquisition'),
      l('设备配对', 'Device pairing'),
      l('状态上报', 'Status reporting'),
    ],
    features: [
      l('稳定数据传输', 'Stable data transfer'),
      l('快速集成', 'Fast integration'),
      l('低功耗设计', 'Low-power design'),
    ],
    products: ['ble-transparent-chip', 'bluetooth-module'],
    keywords: ['transparent', 'transfer', 'bluetooth', '透传'],
  },
  {
    slug: 'wearables',
    name: l('智能穿戴解决方案', 'Smart Wearable Solution'),
    image: '/assets/25.jpg',
    summary: l(
      '面向手环、手表和低功耗智能穿戴设备的连接方案。',
      'Connectivity solution for bands, watches and low-power wearable devices.',
    ),
    overview: l(
      '支持轻薄产品的稳定连接、续航控制和数据同步需求，适配多类穿戴产品形态。',
      'Supports stable connection, battery control and data sync for compact wearable products.',
    ),
    scenes: [
      l('运动手环', 'Fitness band'),
      l('智能手表', 'Smart watch'),
      l('健康监测设备', 'Health monitor'),
    ],
    features: [
      l('稳定蓝牙连接', 'Stable Bluetooth connection'),
      l('轻薄长续航', 'Compact and long battery life'),
      l('可靠性验证', 'Reliability validation'),
    ],
    products: ['ble-soc', 'audio-soc'],
    keywords: ['wearable', 'watch', '穿戴'],
  },
] as const

export const supportSections = [
  {
    slug: 'sdk',
    title: l('SDK', 'SDK'),
    intro: l(
      '面向芯片集成与应用开发的基础支持包入口。',
      'Core support packages for chip integration and application development.',
    ),
    rows: [
      [
        'SDK 主程序',
        'SDK Package',
        'SDK 资源',
        'SDK',
        '基础开发资源、示例工程与集成说明。',
        'Base resources, examples and integration notes.',
        '目录预留',
        'Directory reserved',
      ],
      [
        '快速上手指南',
        'Quick Start Guide',
        '接入指南',
        'Guide',
        '从环境准备到首次验证的开发路径。',
        'Development path from environment setup to first validation.',
        '可咨询获取',
        'Available on request',
      ],
      [
        '版本说明',
        'Release Notes',
        '版本信息',
        'Release',
        '记录 SDK 更新范围与兼容性信息。',
        'SDK update scope and compatibility notes.',
        '持续更新',
        'In progress',
      ],
    ],
    keywords: ['sdk', 'software', '开发'],
  },
  {
    slug: 'tools',
    title: l('开发工具', 'Development Tools'),
    intro: l(
      '用于烧录、调试和验证的工具资料入口。',
      'Tools for flashing, debugging and validation.',
    ),
    rows: [
      [
        '烧录工具',
        'Flashing Tool',
        '烧录',
        'Flashing',
        '用于固件下载与烧录流程验证。',
        'For firmware download and flashing workflow validation.',
        '目录预留',
        'Directory reserved',
      ],
      [
        '调试助手',
        'Debug Assistant',
        '调试',
        'Debug',
        '用于连接状态、日志与通信问题定位。',
        'For connection state, logs and communication issue diagnosis.',
        '可咨询获取',
        'Available on request',
      ],
      [
        '验证工具',
        'Validation Tool',
        '验证',
        'Validation',
        '用于功能、稳定性与交付前检查。',
        'For function, stability and pre-delivery checks.',
        '持续更新',
        'In progress',
      ],
    ],
    keywords: ['tool', 'flash', 'debug', '烧录', '调试'],
  },
  {
    slug: 'documents',
    title: l('文档中心', 'Document Center'),
    intro: l(
      '按产品和开发阶段组织的技术资料入口。',
      'Technical documents organized by product and development stage.',
    ),
    rows: [
      [
        '产品资料',
        'Product Documents',
        '产品资料',
        'Product',
        '规格、参数与产品选型相关资料。',
        'Specifications, parameters and selection documents.',
        '可咨询获取',
        'Available on request',
      ],
      [
        '参考设计',
        'Reference Design',
        '参考设计',
        'Reference',
        '硬件与软件集成参考资料。',
        'Hardware and software integration references.',
        '目录预留',
        'Directory reserved',
      ],
      [
        '流程文件',
        'Process Files',
        '流程文件',
        'Process',
        '开发、验证与交付阶段的流程资料。',
        'Development, validation and delivery process files.',
        '持续更新',
        'In progress',
      ],
    ],
    keywords: ['document', 'datasheet', '文档', '资料'],
  },
  {
    slug: 'forum',
    title: l('技术论坛', 'Technical Forum'),
    intro: l(
      '面向技术交流与问题沟通的主题分区入口，当前作为筹备中的静态信息入口。',
      'Topic areas for technical discussion; currently a static placeholder for the future forum.',
    ),
    rows: [
      [
        '蓝牙连接',
        'Bluetooth Connectivity',
        '连接与协议',
        'Connectivity',
        '围绕配对、连接、传输与协议适配的问题交流。',
        'Pairing, connection, transfer and protocol adaptation topics.',
        '筹备中',
        'Preparing',
      ],
      [
        '硬件设计',
        'Hardware Design',
        '硬件设计',
        'Hardware',
        '围绕射频、电源、天线和硬件集成的问题交流。',
        'RF, power, antenna and hardware integration topics.',
        '筹备中',
        'Preparing',
      ],
      [
        '固件与调试',
        'Firmware & Debug',
        '固件与调试',
        'Firmware',
        '围绕固件集成、日志分析与功能验证的问题交流。',
        'Firmware integration, logs and validation topics.',
        '筹备中',
        'Preparing',
      ],
    ],
    keywords: ['forum', 'support', '论坛'],
  },
  {
    slug: 'faq',
    title: l('FAQ', 'FAQ'),
    intro: l(
      '快速定位选型、资料申请、开发支持与问题反馈路径。',
      'Quick answers for selection, resources, support and issue reporting.',
    ),
    rows: [
      [
        '如何开始产品选型？',
        'How do I start product selection?',
        '产品选型',
        'Selection',
        '准备产品形态、连接方式、功耗目标和量产计划。',
        'Prepare product form, connection mode, power target and production plan.',
        '建议先咨询',
        'Consult first',
      ],
      [
        '如何申请 SDK 或开发资料？',
        'How do I request SDK or documents?',
        '资料获取',
        'Resources',
        '说明目标产品、项目阶段和所需资料类型。',
        'Share target product, project stage and requested resource type.',
        '联系获取',
        'Contact required',
      ],
      [
        '开发过程中遇到调试问题怎么办？',
        'What if I meet a debugging issue?',
        '开发支持',
        'Development',
        '提交设备型号、复现步骤、日志或现象描述。',
        'Send device model, reproduction steps, logs or symptom description.',
        '技术支持',
        'Support',
      ],
    ],
    faqs: [
      l(
        '资料是否支持直接下载？|当前静态原型保留资料目录与状态展示，正式接入后可绑定真实下载或权限申请流程。',
        'Are downloads available directly?|This static prototype reserves resource entries and ' +
          'statuses. Real downloads or permission requests can be connected later.',
      ),
      l(
        '技术论坛现在可以发帖吗？|论坛目前作为筹备中的信息入口，后续可接入真实论坛系统或工单系统。',
        'Can I post in the forum now?|The forum is currently a prepared information entry and ' +
          'can later connect to a real forum or ticket system.',
      ),
    ],
    keywords: ['faq', 'question', '常见问题'],
  },
] as const

export const companyStats = [
  { value: '50+', label: l('员工人数', 'Employees') },
  { value: '50%+', label: l('技术研发人员占比', 'R&D Ratio') },
  { value: '10,000,000+', label: l('月均出货量 PCS', 'Monthly Shipments PCS') },
  { value: '4', label: l('核心产品与方案线', 'Core Product Lines') },
] as const

export const companyCapabilities = [
  l('射频研发与无线连接调优', 'RF development and wireless connectivity tuning'),
  l('嵌入式固件、SDK 与协议栈定制', 'Embedded firmware, SDK and protocol customization'),
  l('芯片、模组、参考设计与量产支持', 'Chip, module, reference design and production support'),
  l('围绕客户产品形态的方案共创', 'Solution co-creation around customer product form factors'),
] as const

export const heroSlides = [
  {
    title: products[0].name,
    text: products[0].summary,
    image: '/assets/6.jpg',
    href: '/products/ble-transparent-chip',
    navTone: 'light',
  },
  {
    title: solutions[0].name,
    text: solutions[0].summary,
    image: '/assets/31.jpg',
    href: '/solutions/keyboard-mouse',
    navTone: 'dark',
  },
  {
    title: supportSections[3].title,
    text: supportSections[3].intro,
    image: '/assets/43.jpg',
    href: '/support/forum',
    navTone: 'dark',
  },
] as const

export const megaPanels = [
  {
    id: 'products',
    title: labels.products,
    links: products.map((item) => ({ label: item.name, href: `/products/${item.slug}` })),
  },
  {
    id: 'solutions',
    title: labels.solutions,
    links: solutions.map((item) => ({ label: item.name, href: `/solutions/${item.slug}` })),
  },
  {
    id: 'support',
    title: labels.support,
    links: supportSections.map((item) => ({ label: item.title, href: `/support/${item.slug}` })),
  },
  {
    id: 'company',
    title: labels.company,
    links: [
      { label: l('公司介绍', 'Company Profile'), href: '/company#overview' },
      { label: l('研发网络', 'R&D Network'), href: '/company#network' },
      { label: l('合作伙伴', 'Partners'), href: '/company#partners' },
    ],
  },
] as const

export const buildSearchIndex = (locale: LocaleCode) => [
  ...products.map((item) => ({
    title: t(item.name, locale),
    category: t(item.category, locale),
    summary: t(item.summary, locale),
    href: `/products/${item.slug}`,
    keywords: item.keywords,
  })),
  ...solutions.map((item) => ({
    title: t(item.name, locale),
    category: t(labels.solutions, locale),
    summary: t(item.summary, locale),
    href: `/solutions/${item.slug}`,
    keywords: item.keywords,
  })),
  ...supportSections.map((item) => ({
    title: t(item.title, locale),
    category: t(labels.support, locale),
    summary: t(item.intro, locale),
    href: `/support/${item.slug}`,
    keywords: item.keywords,
  })),
  {
    title: locale === 'zh' ? '关于壹原理' : 'About YiYuanLi',
    category: t(labels.company, locale),
    summary:
      locale === 'zh'
        ? '公司定位、核心能力、研发网络与合作入口。'
        : 'Company positioning, capabilities, R&D network and cooperation entry.',
    href: '/company',
    keywords: ['company', 'about', '公司'],
  },
  {
    title: t(labels.contactSales, locale),
    category: locale === 'zh' ? '合作咨询' : 'Business',
    summary:
      locale === 'zh'
        ? '销售咨询、技术支持与样品申请表单。'
        : 'Sales consultation, technical support and sample request form.',
    href: '/#contact',
    keywords: ['contact', 'sales', 'support', '联系'],
  },
]

export const navItems = [
  { label: labels.home, href: '/' },
  { label: labels.products, href: '/#products', panel: 'products' },
  { label: labels.solutions, href: '/#solutions', panel: 'solutions' },
  { label: labels.support, href: '/#support', panel: 'support' },
  { label: labels.company, href: '/company', panel: 'company' },
] as const

export const findProduct = (slug: string) => products.find((item) => item.slug === slug)
export const findSolution = (slug: string) => solutions.find((item) => item.slug === slug)
export const findSupportSection = (slug: string) =>
  supportSections.find((item) => item.slug === slug)
