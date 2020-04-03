import Vue from 'nativescript-vue'
import App from './components/App'
import RadChart from 'nativescript-ui-chart/vue'
import store from './store'
import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
  
Vue.use(RadChart);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
