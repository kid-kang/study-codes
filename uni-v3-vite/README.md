# uniapp+vue3+vite4 基础框架（初稿）

- 项目基础框架，目的是减少项目开发时的重复性工作，提高开发效率，同时统一团队的代码规范，提高开发质量
- 基于团队使用框架于项目开发后的总结，优化框架的使用体验、基本逻辑，丰富组件库、工具库的封装，不断完善框架的功能

## 安装使用

- 安装依赖
  `node`版本>16.0.0，`npm`版本>8.0.0

```bash
npm install
```

- 运行

```bash
npm run dev
```

小程序运行成功后，使用微信开发者工具打开项目下生成的`dist`目录下的`mp-weixin`，即可完成项目的同步。

使用 Hbuilder 的运行到小程序模拟器其实执行的就是`npm run dev:mp:weixin`并唤起微信开发者工具绑定`dist`下的`mp-weixin`目录的过程

但不管使用者的操作步骤如何，只要微信开发者工具绑定目录成功后，下次打开项目即可直接在 vscode 或是命令行工具运行`npm run dev`即可，无须依赖于 Hbuilder

- 打包

```bash
npm run build
```

## 目录结构

```shell
.
├─ src
│   ├─api # 接口相关
│   ├─components # 组件目录
│   ├─enums # 常量枚举
│   ├─hooks # hooks工具函数库
│   ├─pages # 页面
│   ├─static # 静态资源目录
│   ├─store # pinia状态管理
│   ├─styles # 额外样式
│   │   ├─ global.scss # 全局样式
│   │   └─...
│   ├─subpkgs # 分包页面
│   ├─uni_modules # UI组件库
│   ├─utils # 工具类
│   │   ├─ index.js # 通用工具类
│   │   ├─ request.js # 请求封装
│   │   ├─ wxmini.js # 小程序相关能力封装
│   │   └─ ...
│   ├─App.vue # 应用配置入口
│   ├─main.js # Vue初始化入口
│   ├─manifest.json # 配置页面信息
│   ├─pages.json # 配置路由信息
│   └─uni.scss # 常用样式变量
├─ .env # 环境变量配置
├─ .eslintignore # eslint忽略规则
├─ .eslintrc-auto-import.json # eslint自动导入配置
├─ .cz-config.js # 配置代码提交提示信息
├─ .eslintrc.js # eslint配置文件
├─ .gitignore # git提交忽略规则
├─ .prettierignore # prettier忽略规则
├─ .prettierrc.js # prettier代码格式化规则
├─ auto-import.d.ts # 自动导入类型声明
├─ commitlint.config.js # 配置代码提交规范
├─ index.html # 主页面
├─ jsconfig.json # 代码个性化支持
├─ package.json # npm配置文件
├─ README.md # 项目说明文档
└─ vite.config.js # vite配置文件

```

## UI 框架

UI 部分搜罗统计了目前小程序开发中常用的 UI 框架，但并未发现存在绝对统治力的，或者说都多多少少存在一些缺陷，待定

| 框架        | github star 数 | 支持 vue3 | 收费 | 备注                                                                 |
| ----------- | -------------- | --------- | ---- | -------------------------------------------------------------------- |
| vant weapp  | 16.7k          | 否        | 否   | 基于原生小程序开发的组件库，没有针对 uniapp 进行适配，兼容性存在问题 |
| color ui    | 11.7k          | 否        | 否   | 不维护了                                                             |
| thorUI      | 2.2k           | 是        | 是   |                                                                      |
| uni-ui      | 1.5k           | 是        | 否   |                                                                      |
| uview2.0    | 992            | 否        | 否   |                                                                      |
| firstui     | 209            | 是        | 是   |                                                                      |
| vk-uview-ui | 无             | 是        | 否   |                                                                      |
| tm-ui       | 无             | 是        | 否   | 必须使用 ts                                                          |

## 开发相关说明

- 开发前期，比对设计稿，调整 uni.scss 相关的主题色彩以及 global.scss 中的全局样式
- 引入了@vitejs/plugin-vue-jsx，可以直接使用 [jsx 语法](https://blog.csdn.net/lwf3115841/article/details/128259536)
- 引入了状态持久化工具 pinia-plugin-unistorage，store 下的文件根据需求开启 unistorage: true，数据发生变更时会自动持久化到本地，无须手动操作 localStorage
- 引用了自动引入相关的依赖工具 unplugin-auto-import，使用 vue3 相关的关键词例如 ref、reactive、computed 等，无须手动引入

### Hooks

我们都知道，在 Vue2 中，在同一个.vue 组件中，当 data、methods、computed、watch 的体量较大时，代码将变得臃肿。为了解决代码臃肿问题，我们除了拆分组件外，别无它法。

在 Vue3 中，同样存在这样的问题：当我们的组件开始变得更大时，逻辑关注点将越来越多，这会导致组件难以阅读和理解。但是，在 Vue3 中，我们除了可以拆分组件，还可以使用 Hooks 封装来解决这一问题。

所谓 Hooks 封装，就是把不同的逻辑关注点抽离出来，以达到业务逻辑的独立性。这一思路，也是 Vue3 对比 Vue2 的最大亮点之一。

在 setup 组合的开发模式下，把具体某个业务功能所用到的 ref、reactive、watch、computed、watchEffect 等，提取到一个以 use\* 开头的自定义函数中去。

封装成 use\* 开头的 Hooks 函数，不仅可以享受到封装带来的便利性，还有利于代码逻辑的复用。Hooks 函数的另一个特点是，被复用时可以保持作用域的独立性，即，同一个 Hooks 函数被多次复用，彼此是不干扰的。

而针对封装基本存在两种场景：一种是功能类 Hooks，即为了逻辑复用的封装；另一种是业务类 Hooks，即为了逻辑解耦的封装。

但不能为了封装 Hooks 而封装。要看具备场景是否有复用的价值，是否有利于逻辑的分离，是否有助提升代码的可阅读性和可维护性。

目前项目的 hooks 存放于`src`目录下的`hooks`文件夹下

| hooks         | 功能            |
| ------------- | --------------- |
| useBoolean    | 布尔值切换      |
| useDate       | 时间格式化      |
| useDebounce   | 处理防抖值      |
| useDebounceFn | 处理防抖函数    |
| useInterval   | Interval 定时器 |
| useThrottle   | 处理节流值      |
| useThrottleFn | 处理节流函数    |
| useTimeout    | timeout 定时器  |
| useToggle     | 状态切换        |

### 组件目录

通用组件封装

### 工具函数

- `index.js`通用方法
  | 方法名 | 功能 |
  | ------ | ------ |
  | debounce | 防抖 |
  | throttle | 节流 |
  | throttleAndDeBounce | 防抖+节流 |
  | getStorageData | 读取持久化状态 |
- `wxmini.js`小程序相关场景方法
  | 方法名 | 功能 |
  | ------ | ------ |
  | callPhone | 拨打电话 |
  | getCurLocation | 获取用户定位 |
  | getLocationAuth | 获取用户定位权限相关 |
  | downloadFile | 预览文件 |
  | checkMiniProgramUpdate | 通知更新微信小程序版本 |

## 项目规范

- 首先要说的是，在代码提交的阶段，无论是 commit 还是使用 eslint 针对提交的代码进行检查都未做强制性的处理校验，主旨还是为了培养团队成员平时的代码开发习惯及提交规范，但不能因此本末倒置，为开发增添更多的负担。

- 在项目时间充裕或是进度到了收尾阶段时，查看自己项目里被 eslint 标记的红色文件，根据规范的提示审阅并修改自己的代码，或是执行`npm run eslint`检索出自己项目中不符合规范的代码，或是执行`npm run eslint:fix`直接检索并修复项目下的文件，提高项目整体代码的可读性与规范性。

### 代码格式规范 prettier

安装`vscode`扩展`prettier`

规则暂定如下，根据团队成员习惯可调整，相关配置参考目录下的`.prettierrc.js`

```
{
  printWidth: 100, // 每行字符上限
  tabWidth: 2, // 缩进长度
  useTabs: false, // 不使用tab，而使用空格
  semi: false, // 末尾不需要分号
  singleQuote: true, // 使用单引号
  trailingComma: 'all', // 数组内最后一个对象的末尾有逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  arrowParens: 'always', // 箭头函数参数只有一个时也会有括号
}
```

### 代码规范 eslint

安装`vscode`扩展`eslint`

基于[airbnb 规范](https://github.com/airbnb/javascript)初始化，相关配置参考目录下的`.eslintrc.js`

### 代码提交 commit

[git commit 提交规范](https://www.jianshu.com/p/851ec9cd1709)

项目引入了 commit 提交规范工具，制定了相应的提交规则，但不是强制的，使用命令行提交代码时，执行以下命令，将根据框架预设好的文本完成提交

```bash
git add -A
# 注意：此处不是git commit
npm run commit
```

1. 选择提交类型，回车确认
   ![image.png](https://picture.zhuiyue.vip:444/images/2023/04/03/image.md.png 'image')
2. 选择提交范围，回车确认
   ![image.png](https://picture.zhuiyue.vip:444/images/2023/04/03/image5d8dba08b9bcf287.md.png 'image5d8dba08b9bcf287')
3. 补充提交相关的描述，回车确认
   ![image.png](https://picture.zhuiyue.vip:444/images/2023/04/03/image11e19db7933523ec.md.png 'image11e19db7933523ec')
4. 输入`y`或`Y`确认要提交的 message，回车确认
   ![image.png](https://picture.zhuiyue.vip:444/images/2023/04/03/image3d05cd29ccebe4ce.md.png 'image3d05cd29ccebe4ce')
5. 提交成功，执行`git push`，代码推送完成
   ![image.png](https://picture.zhuiyue.vip:444/images/2023/04/03/image490e2202bebc6a8d.md.png 'image490e2202bebc6a8d')

使用图形化界面或是 vscode 的 git 提交工具时无法参与此流程，请尽量遵循提交规范书写提交时的 message

## 引用包说明

```
 "dependencies": {
    "dayjs": "^1.11.7", # 时间处理工具
    "mockjs": "^1.1.0", # 模拟数据工具
    "pinia": "^2.0.33", # 状态管理工具
    "pinia-plugin-unistorage": "^0.0.11", # 状态持久化储存
    "vue": "^3.2.45", # 基础框架
  },
  "devDependencies": {
    "@commitlint/cli": "^17.5.1", # 提交规范检测工具
    "@commitlint/config-conventional": "^17.4.4", # 提交规范预定义规则集
    "autoprefixer": "^10.4.14", # 代码打包样式兼容型补全插件
    "commitizen": "^4.3.0", # 创建提交规范命令行交互工具
    "commitlint-config-cz": "^0.13.3", # 提交规范命令行交互规则集
    "cz-conventional-changelog": "^3.3.0", # 提交规范命令行交互工具适配器
    "cz-customizable": "^7.0.0",  # 提交规范命令行交互工具适配器
    "eslint": "^8.37.0", # 代码规范校验
    "eslint-config-airbnb-base": "^15.0.0", # airbnb代码规范规则集
    "eslint-config-prettier": "^8.8.0", # 解决prettier与eslint冲突
    "eslint-import-resolver-alias": "^1.1.2", # 解析项目中的别名
    "eslint-plugin-import": "^2.27.5", # import规则检查
    "eslint-plugin-prettier": "^4.2.1", # 讲prettier的规则集成到eslint中
    "eslint-plugin-vue": "^9.10.0", # 检测vue文件规范
    "mockjs": "^1.1.0", # 请求mock工具
    "prettier": "^2.8.7", # 代码格式化工具
    "sass": "^1.60.0", # css语言增强
    "unplugin-auto-import": "^0.15.2", # 自动引入声明
    "vite": "4.1.4" # 项目构建工具
    "vite-plugin-mock": "^2.9.6" # mock插件
  },
```

### 尚未解决的问题

- [ ] mock 拦截在 h5 环境中有效，在小程序环境中无效
- [ ] 确定 UI 库，测试相关组件在 uniapp 及 vue3 体系下能否满足正常的业务需求及相关兼容性踩坑
