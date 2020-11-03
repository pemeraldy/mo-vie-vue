import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routing/app.routing'
import store from './store/index'
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
  router,
}).$mount('#app')
