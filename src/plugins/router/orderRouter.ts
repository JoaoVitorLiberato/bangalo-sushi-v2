export default [
  {
    path: "/detalhes",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "order-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeOrder.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge - Qualidade, Sabor e Tradição",
      description: "Experimente a Autêntica Culinária Japonesa no Bangalô Sushi Lounge"
    },
    children: [
      {
        path: "finalizar-compra",
        name: "form-view",
        components: {
          viewForm: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "form-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/form/viewForm.vue"
          )
        },
      },
      {
        path: "pedido",
        name: "order-view",
        components: {
          viewOrder: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "order-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/order/viewOrder.vue"
          )
        },
      },
    ],
  },

  {
    path: "*",
    redirect: "/",
  },
]
