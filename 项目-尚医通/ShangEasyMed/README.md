# 尚医通
> 本项目构建基于：Vue 3 + TypeScript + Vite + less

## Ⅰ 项目初始化

### 项目创建

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

### 修改默认配置

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

### 清除默认样式

我们使用 [reset-css](https://www.npmjs.com/package/reset-css?activeTab=readme) 这个 npm 包来清楚默认样式。

- **安装**：`npm install reset-css`

- **使用**：在 `src/main.ts` 中引入 `reset-css` 从而清除默认样式

  ```ts
  // ...
  import 'reset-css'
  // ...
  ```

### 安装处理 less 样式预处理器

- **安装**：`npm install -D less`
- **使用**：在 `.vue` 文件的 `<style scoped lang="less"></style>` 中可以写 less 样式

## Ⅱ 静态组件的搭建

**尚医通**网页总共给分为**三个部分**：**顶部、主体、底部**。其中顶部和底部都是永远不变的，因此我们可以**先设计顶部和底部组件，作为全局组件**。此外网页**版心**为 **1200px**。由于主体部分是会变动的，因此**设计主体组件作为路由组件**。

> 相关知识点
>
> - Flex 布局：[MDN Flex](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)、[伸缩盒模型笔记](https://github.com/Nasir1423/front-end-notes/blob/main/1-HTML%2BCSS/HTML%2BCSS.md#%E4%BC%B8%E7%BC%A9%E7%9B%92%E6%A8%A1%E5%9E%8B)
>
> - 定位：[MDN 定位](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning)、[定位笔记](https://github.com/Nasir1423/front-end-notes/blob/main/1-HTML%2BCSS/HTML%2BCSS.md#%E5%AE%9A%E4%BD%8Dday7139p533)

### 顶部组件静态搭建

**组件 HospitalTop 的展示与组织**

- 展示

  ![image-20240530234824425](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240530234824425.png)

- 组件结构

  ```html
  <template>
    <!-- 顶部 -->
    <div class="top">
      <!-- 内容区 -->
      <div class="content">
        <!-- 内容区左侧 -->
        <div class="left">
          <img src="@/assets/images/logo.png" alt="尚医通网站图标" />
          <p>尚医通 预约挂号统一平台</p>
        </div>
        <!-- 内容区右侧 -->
        <div class="right">
          <p class="help">帮助中心</p>
          <p class="auth">
            <span class="login">登录</span>
            /
            <span class="registry">注册</span>
          </p>
        </div>
      </div>
    </div>
  </template>
  ```

- 组件样式

  ```less
  /* 顶部：宽度 100%，高度 70px */
  .top {
    /* 为顶部开启固定定位，其位置永远固定 */
    position: fixed;
    z-index: 999;
  
    width: 100%;
    height: 70px;
    background-color: #fff;
  
    /* 让版心 content 在主轴上居中 */
    display: flex;
    justify-content: center;
  
    /* 内容区：版心；宽度 1200px，高度 70px；网页置中（flex 实现） */
    .content {
      width: 1200px;
      height: 100%;
  
      /* 让内容区左侧和右侧在主轴上靠边分散对齐 */
      display: flex;
      justify-content: space-between;
  
      /* 内容区左侧 */
      .left {
        /* 让内容区左侧中的两部分内容在主轴和侧轴上水平垂直居中 */
        display: flex;
        justify-content: center;
        align-items: center;
  
        img {
          width: 50px;
          height: 50px;
  
          margin-right: 10px;
        }
  
        p {
          font-size: 20px;
          color: #55a6fe;
        }
      }
  
      /* 内容区右侧 */
      .right {
        /* 让内容区右侧中的两部分内容在主轴和侧轴上水平垂直居中 */
        display: flex;
        justify-content: space;
        align-items: center;
  
        font-size: 14px;
        color: #bbb;
  
        .help {
          margin-right: 10px;
          cursor: pointer;
        }
  
        .auth {
          cursor: pointer;
        }
      }
    }
  }
  ```

### 底部组件静态搭建

**组件 HospitalBottom 的展示与组织**

- 展示

  ![image-20240530234929395](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240530234929395.png)

- 组件结构

  ```html
  <template>
    <!-- 底部 -->
    <div class="bottom">
      <!-- 内容区 -->
      <div class="content">
        <!-- 内容区左侧 -->
        <div class="left">
          <p>京ICP备10095211号</p>
          <p>举报电话：4006666696</p>
        </div>
        <!-- 内容区右侧 -->
        <div class="right">
          <p>联系我们</p>
          <p>合作伙伴</p>
          <p>用户协议</p>
          <p>隐私协议</p>
        </div>
      </div>
    </div>
  </template>
  ```

- 组件样式

  ```less
  /* 底部 */
  .bottom {
    width: 100%;
    height: 50px;
    background-color: #f0f2f5;
  
    /* 让版心 content 在主轴上居中 */
    display: flex;
    justify-content: center;
  
    /* 内容区：版心 */
    .content {
      width: 1200px;
      height: 100%;
  
      font-size: 14px;
      color: #aaa;
  
      /* 让内容区左侧与右侧在主轴上靠边分散对齐 */
      display: flex;
      justify-content: space-between;
  
      /* 内容区左侧 */
      .left {
        /* 让内容区左侧中的两部分内容在主轴和侧轴上水平垂直居中 */
        display: flex;
        justify-content: center;
        align-items: center;
  
        p {
          margin-right: 10px;
        }
      }
  
      /* 内容区右侧 */
      .right {
        /* 让内容区右侧中的四部分内容在主轴和侧轴上水平垂直居中 */
        display: flex;
        justify-content: center;
        align-items: center;
  
        p {
          margin-left: 5px;
          cursor: pointer
        }
      }
    }
  }
  ```

## Ⅲ 主体路由组件分析

**尚医通**主体部分至少包括两个路由组件的切换：**首页 + 医院详情信息**。点击首页中的特定医院，可以跳转到具体的医院挂号页面。

> 相关知识点
>
> - VueRouter：[router.vuejs](https://router.vuejs.org/zh/guide/)、[路由笔记(vue-router@3)](https://github.com/Nasir1423/front-end-notes/blob/main/7-vue/vue.md#6-vue-router)
> - 补充：路由组件一般保存在与 `components` 文件夹同级的 `pages` 中；路由规则一般配置在与 `components` 文件夹同级的 `router/index.ts` 中

### 路由器的初步搭建

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

### 安装 Element-plus UI 组件库

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

### 修改 Element-plus UI 组件库样式

当我们想要修改 Element-plus UI 组件库中组件的样式时，会发现一个问题：样式不生效！为了修改特定组件的某一部分的样式，需要通过以下两步实现，

- STEP1：在开发者工具中**查找对应组件部分的类名**，如 `el-date-picker__header-label` 表示日期选择器的标题部分。

- STEP2：在对应的 `.vue` 文件中通过**深度选择器修改对应类名的样式**。

  ```css
  :deep(.el-date-picker__header-label){
      /* 这里是样式 */
  }
  ```

  > 深度选择器有 `>>>`、`/deep/`、`::v-deep`、`:deep()` 四种语法，仅建议使用 `:deep(CSS选择器){ 具体样式 }` 来修改 UI 组件的样式。

### [安装 Icon 图标](https://element-plus.org/zh-CN/component/icon.html)

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

### 首页路由组件静态搭建

由于首页路由组件包含多个部分，如轮播图，搜索框等，因此我们也可以**将首页路由组件拆分为多个部分**，进而实现首页路由组件的静态搭建。

#### [轮播图组件](https://element-plus.org/zh-CN/component/carousel.html)的静态搭建

**组件 Carousel 的展示与组织**

- 展示

  ![image-20240601153920757](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240601153920757.png)

- 组件结构

  ```html
  <template>
    <div class="carousel">
      <el-carousel height="350px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="@/assets/images/banner.png" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </template>
  ```

- 组件样式

  ```less
  /* 设置轮播图组件的样式 */
  .carousel {
    /* 修改轮播图内放置的图片的大小 */
    img {
      height: 350px;
      width: 100%;
    }
  }
  ```

#### 搜索框组件的静态搭建

组件 Search 的展示与组织

- 展示

  ![image-20240601170352464](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240601170352464.png)

- 组件结构

  ```html
  <template>
    <div class="search">
      <el-autocomplete clearable placeholder="请选择医院名称" />
      <el-button type="primary" :icon="Search" />
    </div>
  </template>
  ```

- 组件样式

  ```css
  /* 设置搜索框组件的样式 */
  .search {
    width: 100%;
    height: 50px;
    margin: 40px 0;
  
    /* 让搜索框中的输入框与按钮在主轴和侧轴上水平垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
  
    /* 设置输入框样式 */
    :deep(.el-autocomplete) {
      width: 900px;
      height: 40px;
    }
  
    :deep(.el-input) {
      width: 100%;
      height: 100%;
    }
  
    /* 设置搜索按钮样式 */
    :deep(.el-button) {
      width: 50px;
      height: 40px;
    }
  }
  ```

### 医院详情路由组件静态搭建











---

分为三个部分，网页版心是 1200