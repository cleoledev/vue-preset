module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      serve: 'vue-cli-service serve --port 3000',
      build: 'env BUILD=true vue-cli-service build',
      lint: 'vue-cli-service lint src/**/*.{js,vue} --fix && stylelint --cache src/**/*.{vue,scss} --fix'
    },
    dependencies: {
      'detect-browser': '^5.2.0'
    },
    devDependencies: {
      '@fullhuman/postcss-purgecss': '3.0.0',
      '@fullhuman/vue-cli-plugin-purgecss': '~4.0.3',
      'compression-webpack-plugin': '^5.0.1',
      'css-minimizer-webpack-plugin': '^1.1.5',
      'lint-staged': '^9.5.0',
      'prerender-spa-plugin': '^3.4.0',
      stylelint: '^13.12.0',
      'stylelint-config-recommended-scss': '^4.2.0',
      'stylelint-order': '^4.1.0',
      'stylelint-scss': '^3.19.0',
      'stylelint-webpack-plugin': '^2.1.1',
    },
    'gitHooks': {
      'pre-commit': 'lint-staged'
    },
    'lint-staged': {
      '*.vue': [
        'npm run lint',
        'git add'
      ],
      '*.scss': [
        'npm run lint:style',
        'git add'
      ],
      '*.{js,ts}': [
        'npm run lint:script',
        'git add'
      ]
    }
  })

  // 安裝 Vuex
  if (options.useVuex) {
    api.extendPackage({
      dependencies: {
        vuex: '^3.4.0'
      },
      devDependencies: {
        '@vue/cli-plugin-vuex': '~4.5.0'
      }
    })
  }

  // 安裝額外 plugin
  const pluginVersion = {
    axios: '^0.21.1',
    gsap: '^3.6.1',
    'vue-meta': '^2.4.0'
  }

  if (options.addPlugin.length) {
    const additionalPlugins = {}
    options.addPlugin.reduce((acc, plugin) => {
      acc[plugin] = pluginVersion[plugin]
      return acc
    }, additionalPlugins)

    api.extendPackage({
      dependencies: additionalPlugins
    })
  }



  // 删除 vue-cli 默認的 src 和 public folder
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/')
        || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  // 根據自定義模板生成項目結構
  api.render('./template')
  if (options.useVuex) {
    api.render({
      './src/store/index.js': './optional/vuex.js'
    })
  }
  if (options.addPlugin.includes('axios')) {
    api.render({
      './src/plugins/axios.js': './optional/axios.js'
    })
  }
}