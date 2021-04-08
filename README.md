# vue-preset
基于 vue-cli 4 搭建的前端模板

## 安裝使用

```
vue create -p cleosyuu/vue-preset <project name> -m <npm|yarn>
```
## Features

默認支持

- CSS Preprocessor - dart-sass
- Vue Router - History Mode
- 常用的 Sass 工具集合 & spacing utilities
- gzip & css minimizer 壓縮
- detect-browser

可選項目

- Vuex
- axios
- gsap
- vue-meta

## 目錄結構

```jsx
├── dist
│   └── <BASE_URL>                  # 壓縮後丟進 KAD Private
├── public                          # 靜態資源，不需 webpack 處理
└── src
    ├── assets
    │   ├── img
    │   └── style
    │	    ├── abstract            # 不產生樣式的scss文件 - 變數、mixin等
    │	    ├── animation
    │       ├── base                # reset、font-face及定義整體樣式的文件
    │       └── utilities
    ├── components
    ├── router
    ├── plugins
    ├── pages
    └── store
```

## 參考連結

- [vue-cli 4 官方文檔](https://cli.vuejs.org/zh/guide/plugins-and-presets.html#preset)
- [vue-cli 3 preset 說明文檔](https://cklwblove.github.io/vue-preset/#vue-cli-3-%E5%9F%BA%E6%9C%AC%E8%AE%A4%E8%AF%86)
- [vue-cli 3 preset 打造前端模板](https://segmentfault.com/a/1190000016389996)
