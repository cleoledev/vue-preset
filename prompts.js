module.exports = [
  {
    name: 'baseUrl',
    type: "input",
    message: "專案路徑(base url), ex: /project_name:",
    validate: input => input.startsWith('/'),
    default: "/"
  },
  {
    name: "useVuex",
    type: "confirm",
    message: "是否啟用 Vuex:",
    default: false
  },
  {
    name: 'addPlugin',
    type: 'checkbox',
    message: '安裝額外套件: ',
    choices: [
      { name: 'axios' },
      { name: 'vue-meta' },
      { name: 'gsap' }
    ]
  }
]