import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-pro/css/all.css';
import VueScrollTo from 'vue-scrollto'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueScrollTo)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDlFqQ9mdP062pc_dGksw-EI6ZHoiYQGPM',
    libraries: 'places'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
