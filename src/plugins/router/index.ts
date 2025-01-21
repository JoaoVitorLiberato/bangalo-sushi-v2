import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import { titleUpdate } from "@/plugins/router/functions/titleUpdate"

import "@/plugins/router/routerRegisterHooks"
import mainRouter from "@/plugins/router/mainRouter"
import productsRouter from "@/plugins/router/productsRouter"
import adminRouter from "@/plugins/router/adminRouter"
import orderRouter from "@/plugins/router/orderRouter"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [].concat(
  orderRouter as never[],
  adminRouter as never[],
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
