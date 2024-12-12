# 数据管理系统项目

这是一个基于 Vue 3 的数据管理系统项目，使用 Vite 作为构建工具，Element Plus 作为 UI 组件库，并支持 SCSS 多主题切换。

## 项目设置

该项目使用 `pnpm` 进行包管理，并要求 Node.js 版本为 22（LTS）。

### 项目技术

- **框架**: Vue 3
- **原子化 css**: Tailwind CSS
- **构建工具**: Vite
- **UI 库**: Element Plus
- **状态管理**: Pinia
- **地图库**: OpenLayers (ol)

## 依赖项

- **[@vueuse/core](https://vueuse.org/)**: Vue 的实用工具库，提供了许多有用的组合式 API。
- **[tailwindcss](https://tailwindcss.com/)**: 基于 CSS 的样式库，提供了多种预设的样式，可以快速实现多种 UI 效果。
- **[element-plus](https://element-plus.org/)**: Vue 3 的高级 UI 组件库。
- **[ol](https://openlayers.org/)**: 用于地图渲染的 OpenLayers 库。
- **[pinia](https://pinia.vuejs.org/)**: （Pinia） Vue 的状态管理库。
- **[vue-router](https://router.vuejs.org/)**: Vue 的路由管理库。
- **[vite](https://vitejs.dev/)**: 快速的前端构建工具。
- **[iconfont](https://www.iconfont.cn/)**: 阿里巴巴矢量图标库。
- **[本项目使用的图标](https://www.iconfont.cn/invite?type=project&token=dXWDYajzHwQhcY5W#邀请你加入「库管_bs」)** 库管\_bs

## 配置

### `scripts` 命令

- `dev`: 启动开发服务器。
- `build`: 构建生产环境代码。
- `preview`: 本地预览生产环境构建。
- `lint`: 代码风格检查。

### Prettier 配置

- **printWidth**: 80
- **tabWidth**: 2
- **useTabs**: false
- **singleQuote**: true
- **semi**: true
- **trailingComma**: "all"

### ESLint 配置

使用了 `plugin:vue/vue3-recommended` 和 `prettier` 规范。

### Git 提交规范

```
- **type**: feat、fix、docs、style、refactor、test、chore
需要遵循 commitlint.config.js 规范

```

## 其他

该项目包含多主题切换功能，并集成了 SCSS 和 Element Plus 主题样式的动态切换。

## 目录结构(如图所示)

# DataManager 项目目录结构

这是 DataManager 项目的主要文件和目录结构，便于理解代码组织和功能模块。

## 目录结构

- **env**：环境配置文件，包含项目的环境变量。
- **node_modules**：项目依赖库，包含通过 `pnpm` 安装的所有依赖项。
- **public**：公共资源文件夹，包含不会被打包的静态资源。
  - **config**：配置文件夹，存放公共配置文件。
  - **static**：静态文件目录，包含外部引用的资源。
- **src**：源代码目录，是项目的核心代码部分。
  - **assets**：资源文件夹，存放图片、字体等静态资源。
  - **components**：全局组件文件夹，包含项目的各类组件。
    - **bottomPanels**：底部面板组件文件夹。
    - **common**：通用组件文件夹，包含项目中复用率较高的组件。
    - **fullPanels**：全屏面板组件文件夹。
    - **rightPanels**：右侧面板组件文件夹。
    - **ThemeSwitcher.vue**：主题切换组件，用于动态切换项目主题。
  - **router**：路由配置文件夹，包含项目的路由定义。
  - **services**：服务文件夹，包含 API 调用和业务逻辑处理模块。
  - **stores**：状态管理文件夹，包含 Pinia 定义的全局状态管理文件。
  - **theme**：主题文件夹，包含多主题相关的样式文件。
  - **until**：工具文件夹，包含项目中用到的工具函数。
  - **hooks**：自定义 hooks 文件夹，包含项目中自定义的 hooks。
  - **views**：页面视图文件夹，存放项目的主要页面。
    - **home**：主页文件夹。
      - **components**：主页相关的组件。
      - **index.vue**：主页视图文件。
    - **login**：登录页面文件夹。
  - **App.vue**：主应用组件，是项目的入口组件。
  - **main.js**：项目的主入口文件，负责初始化 Vue 实例和挂载应用。
  - **style.css**：全局样式文件，定义项目的基础样式。

---


## 其他系统搭配

- [运维系统](http://222.190.118.45:18080/backendclient)
- [一张图](http://222.190.118.45:18080/2d3dsystem)

## 代码编写规范

- **组件命名**：使用驼峰命名法，首字母大写，例如：`UserTable`。
- **变量命名**：使用驼峰命名法，首字母小写，例如：`userTable`，如果是常量使用全大写下划线方式，例如：`DATA_LIST`。
- **函数命名**：使用驼峰命名法，首字母大写，例如：`getUserTable`。
- **注释**：使用 `//` 或 `/* */` 注释代码，并在注释中说明代码的功能和用途。

