import Vue from "vue"
import router from "@/plugins/router"
import store from "@/plugins/store"
import vuetify from "@/plugins/vuetify"
import App from "@/App.vue"
import { VueMaskDirective } from 'v-mask'
// import "@/plugins/firebase"
import "@/functions/windowFunctions"

Vue.config.productionTip = false
Vue.directive('mask', VueMaskDirective)

const app = new Vue({
  store,
  router: router(),
  vuetify,
  render: (h) => h(App),
}).$mount("#app")

export default app
