import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FishUI from 'fish-ui'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faGrinSquintTears,
  faMehRollingEyes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMicrophoneAlt)
library.add(faMicrophoneAltSlash)
library.add(faGrinSquintTears)
library.add(faMehRollingEyes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(FishUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
