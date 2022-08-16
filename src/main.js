import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import Multiselect from 'vue-multiselect'
import VCalendar from 'v-calendar'
import Paginate from 'vuejs-paginate'
import moment from 'moment'
import Vuelidate from 'vuelidate'

// register globally
import './scss/index.scss'

Vue.use(VCalendar)
Vue.config.productionTip = false
Vue.use(axios)
Vue.component('MultiSelect', Multiselect)
Vue.component('PaginateButtons', Paginate)
Vue.prototype.moment = moment
Vue.use(Vuelidate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
