import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import { titleUpdate } from "@/plugins/router/functions/titleUpdate"

import "@/plugins/router/routerRegisterHooks"
import mainRouter from "@/plugins/router/mainRouter"
import productsRouter from "@/plugins/router/productsRouter"
import formRouter from "@/plugins/router/formRouter"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [].concat(
  formRouter as never[],
  productsRouter as never[],
  mainRouter as never[],
)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  try {
    titleUpdate(to)
  } catch {/* EMPTY */}
  next()
})

export default ():typeof router|undefined => router
