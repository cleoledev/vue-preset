import Vue from 'vue'
<%_ if (options.addPlugin.includes('vue-meta')) { _%>
  import VueMeta from 'vue-meta'
  <%_ } _%>
import App from './App.vue'
import router from './router'
<%_ if (options.useVuex) { _%>
import store from './store'
<%_ } _%>
import detectBrowser from './plugins/detectBrowser'

Vue.config.productionTip = false

<%_ if (options.addPlugin.includes('vue-meta')) { _%>
  Vue.use(VueMeta)
  <%_ } _%>
Vue.use(detectBrowser)

new Vue({
  router,
  <%_ if (options.useVuex) { _%>
  store,
  <%_ } _%>
  render: h => h(App)
}).$mount('#app')
