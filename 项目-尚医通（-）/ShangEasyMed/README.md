# 尚医通
> 本项目构建基于：Vue 3 + TypeScript + Vite + less

## Ⅰ 项目初始化

### 1.1 项目创建

- **项目创建**

  ```bash
  npm create vite@latest
  ```

- **项目初始化**

  ```bash
  cd my-project
  
  npm install
  npm run dev
  ```

### 1.2 修改默认配置

- 修改 `package.json` 配置，从而**设置每次使用 `npm run dev` 启动项目时，浏览器自动打开**

    ```json
    {
      // ...
      "scripts": {
        "dev": "vite --open",
        ...
      },
      // ...
    }
    ```

- 修改 `vite.config.ts` 配置，从而**设置 `@` 为 `src` 路径的别名**

  ```ts
  ...
  import path from 'path'
  
  export default defineConfig({
    // ...
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    // ...
  })
  
  ```

  > 注意：需要使用 `npm i @types/node` 安装 `@types/node` 包，此时 `.ts` 文件中就可以正常使用 Node.js 的 API，并享受类型检查和自动补全功能。同时 IDE 不会提示错误。

- 修改 `tsconfig.json` 配置，从而**设置 IDE 对路径进行智能提示**（可以识别 `@` 别名）

  ```json
  {
    "compilerOptions": {
      // ...
  
      "baseUrl": ".",
      "paths": {
        "@/*":["src/*"]
      }
    },
    // ...
  }
  ```

### 1.3 清除默认样式

我们使用 [reset-css](https://www.npmjs.com/package/reset-css?activeTab=readme) 这个 npm 包来清楚默认样式。

- **安装**：`npm install reset-css`

- **使用**：在 `src/main.ts` 中引入 `reset-css` 从而清除默认样式

  ```ts
  // ...
  import 'reset-css'
  // ...
  ```

### 1.4 安装处理 less 样式预处理器

- **安装**：`npm install -D less`
- **使用**：在 `.vue` 文件的 `<style scoped lang="less"></style>` 中可以写 less 样式

## Ⅱ 静态组件的搭建

**尚医通**网页总共给分为**三个部分**：**顶部、主体、底部**。其中顶部和底部都是永远不变的，因此我们可以**先设计顶部和底部组件，作为全局组件**。此外网页**版心**为 **1200px**。由于主体部分是会变动的，因此**设计主体组件作为路由组件**。

> 相关知识点
>
> - Flex 布局：[MDN Flex](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)、[伸缩盒模型笔记](https://github.com/Nasir1423/front-end-notes/blob/main/1-HTML%2BCSS/HTML%2BCSS.md#%E4%BC%B8%E7%BC%A9%E7%9B%92%E6%A8%A1%E5%9E%8B)
>
> - 定位：[MDN 定位](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning)、[定位笔记](https://github.com/Nasir1423/front-end-notes/blob/main/1-HTML%2BCSS/HTML%2BCSS.md#%E5%AE%9A%E4%BD%8Dday7139p533)

### 2.1 顶部组件静态搭建

**组件 HospitalTop 的展示与组织**

![image-20240530234824425](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240530234824425.png)

### 2.2 底部组件静态搭建

**组件 HospitalBottom 的展示与组织**

![image-20240530234929395](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240530234929395.png)

## Ⅲ 主体路由组件分析

**尚医通**主体部分至少包括两个路由组件的切换：**首页 + 医院详情信息**。点击首页中的特定医院，可以跳转到具体的医院挂号页面。

> 相关知识点
>
> - VueRouter：[router.vuejs](https://router.vuejs.org/zh/guide/)、[路由笔记(vue-router@3)](https://github.com/Nasir1423/front-end-notes/blob/main/7-vue/vue.md#6-vue-router)
> - 补充：路由组件一般保存在与 `components` 文件夹同级的 `pages` 中；路由规则一般配置在与 `components` 文件夹同级的 `router/index.ts` 中

### 3.1 路由器的初步搭建

我们在 `src/router/index.ts` 中创建并暴露了一个路由器：设置了**路由器工作模式、路由器规则、路由跳转后的滚动行为**

```ts
import { createRouter, createWebHistory } from "vue-router"

/* 创建并暴露路由器对象 router，用于管理一组路由规则 */
export default createRouter({
    history: createWebHistory(), // 指定路由工作模式为 history 模式
    routes: [ // 配置一组路由规则
        {
            name: "Home",
            path: "/home",
            component: () => import("@/pages/home/index.vue") // 路由的懒加载
        },
        {
            name: "Hospital",
            path: "/hospital",
            component: () => import("@/pages/hospital/index.vue") // 路由的懒加载
        },
        {
            path: "/",
            redirect: "/home"
        }
    ],
    scrollBehavior() { // 路由跳转后的滚动行为
        return {
            left: 0,
            top: 0
        }
    }
})
```

### 3.2 安装 Element-plus UI 组件库

- **[安装](https://element-plus.org/zh-CN/guide/installation.html)**：`npm install element-plus --save`

- **[使用](https://element-plus.org/zh-CN/guide/quickstart.html)**（按需引入）

  - STEP1：安装插件 `unplugin-vue-components`、`unplugin-auto-import`

    ```bash
    npm install -D unplugin-vue-components unplugin-auto-import
    ```

  - STEP2：修改 `vite.config.ts` 配置

    ```ts
    // ...
    import AutoImport from 'unplugin-auto-import/vite'
    import Components from 'unplugin-vue-components/vite'
    import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
    
    
    // https://vitejs.dev/config/
    export default defineConfig( {
      plugins: [
        // ...
        /* 自动引入组件 */
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        /* 自动注册组件 */
        Components({
          resolvers: [ElementPlusResolver()]
        })
      ],
      // ...
    })
    ```

  - STEP3：直接使用 UI 组件，使用以下代码测试上述代码是否配置成功

    ```vue
    <script lang="ts" setup></script>
    <template>
        <div>
          <h1>App页面</h1>
          <el-row class="mb-4">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
          </el-row>
        </div>
    </template>
    <style lang="less" scoped></style>
    ```

### 3.3 修改 Element-plus UI 组件库样式

当我们想要修改 Element-plus UI 组件库中组件的样式时，会发现一个问题：样式不生效！为了修改特定组件的某一部分的样式，需要通过以下两步实现，

- STEP1：在开发者工具中**查找对应组件部分的类名**，如 `el-date-picker__header-label` 表示日期选择器的标题部分。

- STEP2：在对应的 `.vue` 文件中通过**深度选择器修改对应类名的样式**。

  ```css
  :deep(.el-date-picker__header-label){
      /* 这里是样式 */
  }
  ```

  > 深度选择器有 `>>>`、`/deep/`、`::v-deep`、`:deep()` 四种语法，仅建议使用 `:deep(CSS选择器){ 具体样式 }` 来修改 UI 组件的样式。

### 3.4 [安装 Icon 图标](https://element-plus.org/zh-CN/component/icon.html)

- **安装**：`npm install @element-plus/icons-vue`

- **使用**：**直接按需引入对应的图标**，并通过组建的 `:icon` 属性直接使用。

  ```vue
  <template>
  	<el-button type="danger" :icon="Delete" circle />
  </template>
  
  <script setup lang="ts">
      import { Delete } from "@element-plus/icons-vue";
  </script>
  ```

### 3.5 设置国际化

因为 Element Plus 组件默认使用英语，因此如果要使用中文，则需要进行以下设置（App.vue）。

```vue
<template>
  <el-config-provider :locale="locale">
    // ...
  </el-config-provider>
</template>

<script setup lang="ts">
// ...

/* 国际化设置 */
import { ref } from "vue";
import { ElConfigProvider } from 'element-plus';
import zhCn from "element-plus/es/locale/lang/zh-cn";
const locale = ref(zhCn);
</script>
```

## Ⅳ 首页路由组件静态搭建

由于首页路由组件包含多个部分，如**轮播图，搜索框、多内容区**，因此我们也可以**将首页路由组件拆分为多个部分**，进而实现首页路由组件的静态搭建。

### 4.1 [轮播图组件](https://element-plus.org/zh-CN/component/carousel.html)的静态搭建

**组件 Carousel 的展示与组织**

![image-20240601153920757](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240601153920757.png)

### 4.2 [搜索](https://element-plus.org/zh-CN/component/button.html)[框](https://element-plus.org/zh-CN/component/autocomplete.html)组件的静态搭建

**组件 Search 的展示与组织**

![image-20240601170352464](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240601170352464.png)

### 4.3 [多内容区组件](https://element-plus.org/zh-CN/component/layout.html)的静态搭建

多内容区采取两列布局，左边分为**条件筛选区域**（根据等级或地区可以对医院进行筛选）、**医院展示区域**、**分页条**；右侧则为**广告区域**。效果如下。

picture

#### i. 条件筛选组件的静态搭建

**组件 Conditions 的展示与组织**

![image-20240602000501340](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240602000501340.png)

#### ii. [医院展示组件](https://element-plus.org/zh-CN/component/card.html)的静态搭建

**组件 HospitalCard 的展示与组织**

![image-20240602000738929](C:\Users\15787\AppData\Roaming\Typora\typora-user-images\image-20240602000738929.png)

#### iii. [分页条组件](https://element-plus.org/zh-CN/component/pagination.html)的静态搭建

**组件 Pagination 的展示与组织**

![image-20240602134846807](C:\Users\15787\AppData\Roaming\Typora\typora-user-images\image-20240602134846807.png)

#### iv. Axios 的二次封装

- **安装**：`npm i axios`

- **封装**（`src/utils/request.ts`）

  ```ts
  import axios from "axios"
  
  /* 创建 axios 实例对象 */
  const request = axios.create({
      baseURL: "/api", // 请求基础路径
      timeout: 5000 // 请求超时时间
  });
  
  /* 配置请求拦截器 */
  request.interceptors.request.use((config) => {
      return config
  }, (error) => {
      return Promise.reject(error);
  });
  
  /* 配置响应拦截器 */
  request.interceptors.response.use((response) => {
      /* 这里进行数据简化 */
      return response;
  }, (error) => {
      /* 这里处理 http 网络错误（非 2xx 范围的状态码都会触发该错误） */
      return Promise.reject(error);
  });
  
  export default request;
  ```

> 所有请求的路径都以 `/api` 开头，因此在封装 axios 的时候可以设置 `baseUrl: "/api"`

#### v. 配置 [Vite 代理跨域](https://cn.vitejs.dev/config/server-options#server-proxy)

我们可以在 `vite.config.ts` 中进行代理跨域的配置。

```ts
// ...
export default defineConfig({
  // ...
  server: {
    /* 代理跨域 */
    proxy: {
      /* 匹配以 `/api` 开头的请求路径 */
      "/api": {
        target: "http://syt.atguigu.cn", // 代理目标地址 / 实际请求的后端服务器地址
        changeOrigin: true  // 修改请求头中的 Host 字段为目标地址的域名（有助于避免由于 Host 字段不匹配而导致的跨域问题或请求失败。）
      }
    }
  }
})
```

> 服务器地址为 `http://syt.atguigu.cn`

#### vi. 医院展示组件与分页条组件的渲染

- **服务器地址**：`http://syt.atguigu.cn/`

- **医院接口地址**：`http://139.198.34.216:8201/swagger-ui.html`

  > **获取分页列表接口**：`/api/hosp/hospital/{page}/{limit}`

- **大致实现步骤描述**

  - STEP1 在 utils/request.ts 中封装 Axios
  - STEP2 在 api/home/index.ts 中封装请求方法
  - STEP3 在 .vue 文件中使用封装好的请求方法，获取数据

## Ⅴ 医院详情路由组件静态搭建



---







less pinia ts