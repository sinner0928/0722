import { l, type L10n } from './site'

export type SolutionDirection = {
  slug: string
  title: L10n
  text: L10n
  overview: L10n
  applications: L10n[]
  highlights: L10n[]
  products?: string[]
}

export const solutionDirectionLabels: Record<string, L10n> = {
  'keyboard-mouse': l('键鼠产品方向', 'Keyboard & Mouse Directions'),
  photography: l('摄影产品方向', 'Photography Product Directions'),
  'remote-control': l('遥控器产品方向', 'Remote Control Directions'),
  'bluetooth-transfer': l('蓝牙透传产品方向', 'Bluetooth Transfer Directions'),
  wearables: l('穿戴产品方向', 'Wearable Product Directions'),
}

export const solutionDirections: Record<string, SolutionDirection[]> = {
  'keyboard-mouse': [
    {
      slug: 'bluetooth-office-mouse',
      title: l('蓝牙无线办公鼠标', 'Bluetooth Wireless Office Mouse'),
      text: l(
        '适合日常办公、移动办公与长时间使用的低功耗鼠标方案。',
        'Low-power mouse solution for daily office, mobile office and long-duration use.',
      ),
      overview: l(
        '面向轻办公与便携输入场景，提供稳定蓝牙连接、低功耗待机和顺滑输入体验，适合标准办公鼠标和轻量化移动鼠标开发。',
        'For light office and portable input scenarios, with stable Bluetooth connectivity, ' +
          'low standby power and smooth input experience.',
      ),
      applications: [
        l('日常办公鼠标', 'Daily office mouse'),
        l('便携移动鼠标', 'Portable mouse'),
        l('低功耗蓝牙外设', 'Low-power Bluetooth peripheral'),
      ],
      highlights: [
        l('低功耗待机', 'Low standby power'),
        l('稳定蓝牙连接', 'Stable Bluetooth connection'),
        l('快速量产适配', 'Fast production adaptation'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
    {
      slug: 'tri-mode-office-mouse',
      title: l('三模办公鼠标', 'Tri-Mode Office Mouse'),
      text: l(
        '兼容多设备切换的办公鼠标方案，适合桌面与移动场景。',
        'Office mouse solution with multi-device switching for desktop and mobile use.',
      ),
      overview: l(
        '支持蓝牙、2.4G 与有线等多模式接入，面向多终端办公和跨设备切换需求，兼顾连接稳定、响应速度和续航表现。',
        'Supports Bluetooth, 2.4G and wired modes for multi-terminal office use and cross-device switching.',
      ),
      applications: [
        l('多设备办公鼠标', 'Multi-device office mouse'),
        l('桌面无线外设', 'Desktop wireless peripheral'),
        l('跨平台输入设备', 'Cross-platform input device'),
      ],
      highlights: [
        l('多模式连接', 'Multi-mode connection'),
        l('设备快速切换', 'Fast device switching'),
        l('办公场景稳定性', 'Office-grade stability'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
    {
      slug: 'bluetooth-keyboard',
      title: l('蓝牙键盘', 'Bluetooth Keyboard'),
      text: l(
        '面向轻薄键盘、办公键盘与多设备输入的低功耗连接方案。',
        'Low-power connectivity for slim keyboards, office keyboards and multi-device input.',
      ),
      overview: l(
        '围绕键盘矩阵扫描、低延迟输入、低功耗休眠和多设备配对提供连接方案，适合办公键盘、便携键盘和智能终端输入配件。',
        'Connectivity for keyboard matrix scanning, low-latency input, low-power sleep and multi-device pairing.',
      ),
      applications: [
        l('轻薄蓝牙键盘', 'Slim Bluetooth keyboard'),
        l('办公键盘', 'Office keyboard'),
        l('平板与手机输入配件', 'Tablet and phone input accessory'),
      ],
      highlights: [
        l('低延迟按键链路', 'Low-latency key input'),
        l('长续航休眠策略', 'Long battery sleep strategy'),
        l('多设备配对', 'Multi-device pairing'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
    {
      slug: 'tri-mode-gaming-mouse',
      title: l('三模电竞鼠标', 'Tri-Mode Gaming Mouse'),
      text: l(
        '面向电竞与高频操作的低时延、多模式鼠标方案。',
        'Low-latency multi-mode mouse solution for gaming and high-frequency operation.',
      ),
      overview: l(
        '针对高回报率、快速响应和多模式连接需求，提供低时延输入链路和稳定无线连接能力，适合电竞鼠标与高性能游戏外设。',
        'For high polling rate, fast response and multi-mode connection needs in gaming mice ' +
          'and high-performance peripherals.',
      ),
      applications: [
        l('电竞鼠标', 'Gaming mouse'),
        l('高回报率输入设备', 'High polling-rate input device'),
        l('低时延无线外设', 'Low-latency wireless peripheral'),
      ],
      highlights: [
        l('低时延响应', 'Low-latency response'),
        l('多模式接入', 'Multi-mode access'),
        l('高频操作稳定性', 'High-frequency operation stability'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
    {
      slug: 'tri-mode-gaming-keyboard',
      title: l('三模电竞键盘', 'Tri-Mode Gaming Keyboard'),
      text: l(
        '面向电竞键盘与高性能输入设备的多模式连接方案。',
        'Multi-mode connectivity for gaming keyboards and high-performance input devices.',
      ),
      overview: l(
        '面向电竞键盘的快速按键响应、多模式连接和灯效控制需求，支持从芯片选型到固件适配的方案落地。',
        'For gaming keyboard needs including fast key response, multi-mode connection and ' +
          'lighting control integration.',
      ),
      applications: [
        l('三模电竞键盘', 'Tri-mode gaming keyboard'),
        l('机械键盘', 'Mechanical keyboard'),
        l('高性能输入终端', 'High-performance input terminal'),
      ],
      highlights: [
        l('快速按键响应', 'Fast key response'),
        l('连接模式切换', 'Connection mode switching'),
        l('固件适配支持', 'Firmware adaptation support'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
  ],
  photography: [
    {
      slug: 'selfie-remote',
      title: l('自拍遥控器', 'Selfie Remote'),
      text: l(
        '适合自拍杆、手机拍摄遥控与轻量化创作配件。',
        'For selfie sticks, mobile shutter remotes and lightweight creator accessories.',
      ),
      overview: l(
        '面向手机拍摄与轻量化创作配件，提供低功耗按键控制、快速连接和稳定触发能力。',
        'For mobile shooting and lightweight creator accessories, with low-power key control ' +
          'and stable trigger capability.',
      ),
      applications: [
        l('自拍杆遥控器', 'Selfie stick remote'),
        l('手机拍摄配件', 'Mobile shooting accessory'),
        l('便携创作工具', 'Portable creator tool'),
      ],
      highlights: [
        l('低功耗按键控制', 'Low-power button control'),
        l('快速配对', 'Fast pairing'),
        l('轻量化集成', 'Lightweight integration'),
      ],
      products: ['ble-transparent-chip', 'bluetooth-module'],
    },
    {
      slug: 'live-controller',
      title: l('直播控制器', 'Live Streaming Controller'),
      text: l(
        '面向直播切换、补光控制与多设备操控的无线控制入口。',
        'Wireless control entry for live switching, lighting and multi-device operation.',
      ),
      overview: l(
        '覆盖直播场景中的拍摄切换、灯光控制和快捷操作需求，帮助控制器产品建立稳定无线控制链路。',
        'Covers live streaming switching, lighting control and shortcut operation needs with ' +
          'stable wireless control links.',
      ),
      applications: [
        l('直播遥控器', 'Live remote'),
        l('补光灯控制器', 'Lighting controller'),
        l('多设备快捷控制', 'Multi-device shortcut control'),
      ],
      highlights: [
        l('多按键映射', 'Multi-button mapping'),
        l('稳定控制链路', 'Stable control link'),
        l('低门槛接入', 'Easy integration'),
      ],
      products: ['ble-transparent-chip', 'bluetooth-module'],
    },
    {
      slug: 'tracking-controller',
      title: l('跟拍控制器', 'Tracking Controller'),
      text: l(
        '用于跟拍设备、云台配件与移动摄影控制场景。',
        'For tracking devices, gimbal accessories and mobile shooting control.',
      ),
      overview: l(
        '面向云台、跟拍设备和移动摄影配件，提供无线控制、状态同步和低功耗连接能力。',
        'For gimbals, tracking devices and mobile shooting accessories, with wireless control and state sync.',
      ),
      applications: [
        l('云台遥控', 'Gimbal remote'),
        l('跟拍设备控制', 'Tracking device control'),
        l('移动摄影配件', 'Mobile shooting accessory'),
      ],
      highlights: [
        l('状态同步', 'State sync'),
        l('低功耗连接', 'Low-power connection'),
        l('户外稳定性', 'Outdoor stability'),
      ],
      products: ['ble-transparent-chip', 'audio-soc'],
    },
  ],
  'remote-control': [
    {
      slug: 'tv-remote',
      title: l('电视遥控器', 'TV Remote'),
      text: l(
        '覆盖电视、机顶盒与家庭娱乐设备的低功耗遥控方案。',
        'Low-power remote control for TVs, set-top boxes and home entertainment devices.',
      ),
      overview: l(
        '面向家庭影音设备遥控需求，支持低功耗待机、快速唤醒和多协议适配。',
        'For home entertainment remote control needs, with low standby power, fast wake-up and protocol adaptation.',
      ),
      applications: [
        l('电视遥控器', 'TV remote'),
        l('机顶盒遥控器', 'Set-top box remote'),
        l('家庭娱乐控制器', 'Home entertainment controller'),
      ],
      highlights: [
        l('低待机功耗', 'Low standby power'),
        l('快速唤醒', 'Fast wake-up'),
        l('协议适配', 'Protocol adaptation'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
    {
      slug: 'appliance-remote',
      title: l('小家电遥控', 'Small Appliance Remote'),
      text: l(
        '面向风扇、灯具、清洁设备等小家电控制场景。',
        'For fans, lights, cleaning devices and other small appliance control scenarios.',
      ),
      overview: l(
        '为小家电和智能控制配件提供轻量化无线控制入口，适合快速集成和成本敏感产品。',
        'Lightweight wireless control entry for small appliances and smart control accessories.',
      ),
      applications: [
        l('风扇遥控', 'Fan remote'),
        l('灯具控制', 'Lighting control'),
        l('清洁设备控制', 'Cleaning device control'),
      ],
      highlights: [
        l('轻量化方案', 'Lightweight solution'),
        l('快速定制', 'Fast customization'),
        l('低成本接入', 'Cost-conscious integration'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
    {
      slug: 'two-wheeler-key',
      title: l('两轮车钥匙', 'Two-Wheeler Key'),
      text: l(
        '适合电动车钥匙、身份识别与近距离控制应用。',
        'For e-bike keys, identity recognition and near-field control applications.',
      ),
      overview: l(
        '面向两轮车智能钥匙和身份识别场景，支持近距离控制、低功耗待机和稳定连接。',
        'For two-wheeler smart keys and identity recognition, with near-field control and stable connection.',
      ),
      applications: [
        l('电动车钥匙', 'E-bike key'),
        l('身份识别配件', 'Identity accessory'),
        l('近距离控制终端', 'Near-field control terminal'),
      ],
      highlights: [
        l('近距离控制', 'Near-field control'),
        l('身份识别', 'Identity recognition'),
        l('低功耗待机', 'Low standby power'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
  ],
  'bluetooth-transfer': [
    {
      slug: 'sensor-transfer',
      title: l('传感器数据透传', 'Sensor Data Transfer'),
      text: l(
        '用于传感器状态上报、轻量数据采集与无线同步。',
        'For sensor reporting, lightweight data acquisition and wireless sync.',
      ),
      overview: l(
        '面向传感器和采集设备，提供稳定数据上报、低功耗传输和快速接入能力。',
        'For sensors and acquisition devices, with stable reporting, low-power transfer and fast integration.',
      ),
      applications: [
        l('传感器状态上报', 'Sensor status reporting'),
        l('轻量数据采集', 'Lightweight data acquisition'),
        l('无线同步终端', 'Wireless sync terminal'),
      ],
      highlights: [
        l('稳定透传', 'Stable transparent transfer'),
        l('低功耗传输', 'Low-power transfer'),
        l('快速接入', 'Fast integration'),
      ],
      products: ['ble-transparent-chip', 'bluetooth-module'],
    },
    {
      slug: 'controller-transfer',
      title: l('控制器透传', 'Controller Transfer'),
      text: l(
        '面向控制器、执行器与设备指令链路的稳定传输。',
        'Stable transfer for controllers, actuators and device command links.',
      ),
      overview: l(
        '为控制器和执行器建立可靠指令传输链路，适合设备控制、状态同步和轻量化指令交互。',
        'Reliable command transfer links for controllers and actuators, suitable for device control and state sync.',
      ),
      applications: [
        l('设备控制器', 'Device controller'),
        l('执行器链路', 'Actuator link'),
        l('指令同步终端', 'Command sync terminal'),
      ],
      highlights: [
        l('指令链路稳定', 'Stable command link'),
        l('响应及时', 'Timely response'),
        l('易于嵌入', 'Easy embedding'),
      ],
      products: ['ble-transparent-chip', 'bluetooth-module'],
    },
    {
      slug: 'module-integration',
      title: l('模组化接入', 'Modular Integration'),
      text: l(
        '适合快速原型验证与量产产品的蓝牙模组接入。',
        'Bluetooth module integration for rapid prototyping and mass production.',
      ),
      overview: l(
        '通过蓝牙模组方式降低无线设计门槛，帮助团队快速完成原型验证并过渡到量产交付。',
        'Bluetooth module integration lowers wireless design barriers from prototype ' +
          'validation to production delivery.',
      ),
      applications: [
        l('快速原型验证', 'Rapid prototype validation'),
        l('量产产品接入', 'Production integration'),
        l('既有设备无线化', 'Wireless upgrade for existing devices'),
      ],
      highlights: [
        l('模组化集成', 'Modular integration'),
        l('缩短开发周期', 'Shorter development cycle'),
        l('量产友好', 'Production friendly'),
      ],
      products: ['bluetooth-module', 'ble-transparent-chip'],
    },
  ],
  wearables: [
    {
      slug: 'fitness-band',
      title: l('运动手环', 'Fitness Band'),
      text: l(
        '面向轻薄手环的数据同步、连接稳定与续航控制。',
        'Data sync, stable connection and battery control for slim fitness bands.',
      ),
      overview: l(
        '面向运动手环和轻量穿戴设备，提供数据同步、低功耗连接和稳定配对能力。',
        'For fitness bands and lightweight wearables, with data sync, low-power connection and stable pairing.',
      ),
      applications: [
        l('运动手环', 'Fitness band'),
        l('轻量穿戴设备', 'Lightweight wearable'),
        l('健康数据同步终端', 'Health data sync terminal'),
      ],
      highlights: [
        l('长续航连接', 'Long-battery connection'),
        l('数据同步稳定', 'Stable data sync'),
        l('轻量化集成', 'Lightweight integration'),
      ],
      products: ['ble-soc', 'bluetooth-module'],
    },
    {
      slug: 'smart-watch',
      title: l('智能手表', 'Smart Watch'),
      text: l(
        '适合手表类产品的蓝牙连接、通知同步与外设扩展。',
        'Bluetooth connection, notification sync and peripheral expansion for watches.',
      ),
      overview: l(
        '支持智能手表类设备的蓝牙连接、通知同步、外围设备扩展和低功耗策略。',
        'Supports Bluetooth connection, notification sync, peripheral expansion and low-power strategies for watches.',
      ),
      applications: [
        l('智能手表', 'Smart watch'),
        l('通知同步设备', 'Notification sync device'),
        l('腕上智能终端', 'Wrist smart terminal'),
      ],
      highlights: [
        l('连接稳定', 'Stable connection'),
        l('通知同步', 'Notification sync'),
        l('外设扩展', 'Peripheral expansion'),
      ],
      products: ['ble-soc', 'audio-soc'],
    },
    {
      slug: 'health-monitor',
      title: l('健康监测设备', 'Health Monitor'),
      text: l(
        '用于健康监测、便携检测与低功耗数据传输场景。',
        'For health monitoring, portable detection and low-power data transfer.',
      ),
      overview: l(
        '面向健康监测和便携检测设备，提供低功耗数据传输、状态同步和可靠连接能力。',
        'For health monitoring and portable detection devices, with low-power data transfer and reliable connectivity.',
      ),
      applications: [
        l('健康监测设备', 'Health monitor'),
        l('便携检测终端', 'Portable detection terminal'),
        l('低功耗数据采集', 'Low-power data acquisition'),
      ],
      highlights: [
        l('低功耗传输', 'Low-power transfer'),
        l('可靠连接', 'Reliable connection'),
        l('数据同步', 'Data sync'),
      ],
      products: ['ble-soc', 'audio-soc'],
    },
  ],
}

export const getSolutionDirections = (solutionSlug: string) =>
  solutionDirections[solutionSlug] ?? []

export const findSolutionDirection = (solutionSlug: string, directionSlug: string) =>
  getSolutionDirections(solutionSlug).find((item) => item.slug === directionSlug)
