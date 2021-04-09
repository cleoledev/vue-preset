const packageVersionMap = new Map([
  ['detect-browser', '^5.2.0'],
  ['@fullhuman/postcss-purgecss', '3.0.0'],
  ['@fullhuman/vue-cli-plugin-purgecss', '~4.0.3'],
  ['compression-webpack-plugin', '^5.0.1'],
  ['css-minimizer-webpack-plugin', '^1.1.5'],
  ['lint-staged', '^9.5.0'],
  ['prerender-spa-plugin', '^3.4.0'],
  ['stylelint', '^13.12.0'],
  ['stylelint-config-recommended-scss', '^4.2.0'],
  ['stylelint-order', '^4.1.0'],
  ['stylelint-scss', '^3.19.0'],
  ['stylelint-webpack-plugin', '^2.1.1',],
  ['vuex', '^3.4.0'],
  ['@vue/cli-plugin-vuex', '~4.5.0'],
  ['axios', '^0.21.1'],
  ['gsap', '^3.6.1'],
  ['vue-meta', '^2.4.0']
])

const dependenciesPlugin = ['vuex', 'detect-browser', 'axios', 'gsap', 'vue-meta']
const optionalPlugin = ['vuex', '@vue/cli-plugin-vuex', 'axios', 'gsap', 'vue-meta']

module.exports = (api, options, rootOptions) => {
  const installPackages = {
    dependencies: {},
    devDependencies: {}
  }

  for (let [package, version] of packageVersionMap.entries()) {
    if (optionalPlugin.includes(package)) continue
    if (dependenciesPlugin.includes(package)) {
      installPackages.dependencies[package] = version
    } else {
      installPackages.devDependencies[package] = version
    }
  }

  // 安裝 Vuex
  if (options.useVuex) {
    installPackages.dependencies['vuex'] = packageVersionMap.get('vuex')
    installPackages.devDependencies['@vue/cli-plugin-vuex'] = packageVersionMap.get('@vue/cli-plugin-vuex')
  }

  // 安裝額外 plugin
  if (options.addPlugin.length) {
    options.addPlugin.forEach(plugin => {
      installPackages.dependencies[plugin] = packageVersionMap.get(plugin)
    })
  }

  api.extendPackage({
    scripts: {
      serve: 'vue-cli-service serve --port 3000',
      build: 'env BUILD=true vue-cli-service build',
      lint: 'vue-cli-service lint src/**/*.{js,vue} --fix && stylelint --cache src/**/*.{vue,scss} --fix'
    },
    ...installPackages,
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